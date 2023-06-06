import boto3
import os
from datetime import datetime

ignore_files = ['.DS_Store', 'bundle.js.LICENSE.txt']

def load_environment_variables(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
        for line in lines:
            key, value = line.strip().split('=')
            os.environ[key] = value

def upload_folder_to_s3(local_path, bucket_name):
	s3 = boto3.client('s3')
	for root, dirs, files in os.walk(local_path):
		for file in files:
			local_file = os.path.join(root, file)
			file_name = os.path.relpath(local_file, local_path)
			if file_name in ignore_files:
				continue
			s3_file = 'chatbot/' + local_file
			s3.upload_file(local_file, bucket_name, s3_file)
			print(f"Uploaded {s3_file} to S3 bucket: {bucket_name}")

def submit_cloudfront_invalidation(distribution_id, paths):
	cloudfront = boto3.client('cloudfront')
	timestamp = datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
	caller_reference = f"swr-ai-cdn-invalidation-{timestamp}"
	invalidation_batch = {
		'Paths': {
			'Quantity': len(paths),
			'Items': paths
		},
		'CallerReference': caller_reference
	}
	response = cloudfront.create_invalidation(
		 DistributionId=distribution_id,
		 InvalidationBatch=invalidation_batch
	)
	print("Invalidation request submitted to CloudFront")

load_environment_variables('.env')

# Set AWS credentials and region
os.environ['AWS_ACCESS_KEY_ID'] = os.getenv('AWS_ACCESS_KEY_ID')
os.environ['AWS_SECRET_ACCESS_KEY'] = os.getenv('AWS_SECRET_ACCESS_KEY')
os.environ['AWS_DEFAULT_REGION'] = 'us-east-1'
cloudfront_distribution_id = os.getenv('CLOUDFRONT_DISTRIBUTION_ID')

# Upload the folders to S3
upload_folder_to_s3('static', 'swr-ai-cdn')
upload_folder_to_s3('dist', 'swr-ai-cdn')

# Submit an invalidation request to CloudFront
submit_cloudfront_invalidation(
	cloudfront_distribution_id, 
	['/chatbot/dist/*', '/chatbot/static/*']
)