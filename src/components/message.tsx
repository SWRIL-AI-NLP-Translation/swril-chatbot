import React from 'react';
import { MessageType } from '../types/messages';
import { LoadingDots } from './loading';

export const ChatbotMessage = (props: {
	message: MessageType,
	// is_responding: boolean
}) => {
	const { message } = props;

	const messageClass = message.bot ? 'swril-message-bot' : 'swril-message-user';

	return (
		<div className={`swril-message ${messageClass}`}>
			{message.bot ? <img className="swril-bot-icon" src={'../../static/swrilie.png'} alt="swrilie" /> :
			<span className="material-symbols-outlined swril-account-icon">account_circle</span>	}
			<div>
				{message.service && (<>
					<p>{message.service.title}</p>
					<p>Address: {message.service.address}</p>
					<p>Phone: {message.service.number}</p>
					<p>Website: <a target='_blank' href={message.service.link}>{message.service.link}</a></p>
				</>)}
				{message.text && (
					message.text.split('\n').map((paragraph, i) => {
						return (
							<p key={i}>{paragraph}</p>
						)
					})
				)}
				{message.loading && (
					<LoadingDots />
				)}
			</div>
		</div>
	)
}


{/* <script lang="ts">
	import type { MessageType } from "$lib/types/message";
	import botFace from '$lib/images/botFace.svg';
	import anonFace from '$lib/images/anonFace.svg';
	import responding from '$lib/images/responding.gif';
	import { append } from "svelte/internal";

	export let message: MessageType = {
		text: '',
		bot: true
	};
	export let is_responding: boolean = false;
	let paragraphs = message.text.split('\n');
</script>

<div class="container">
	<div class="botSender">
		{#if message.bot}
			<img src={botFace} alt="botFace" />
		{/if}
	</div>
	<div class={message.bot?'botContent message':'userContent message'}>
		<p>
			{#each paragraphs as paragraph}
				{#if is_responding} 
					<img src={responding} alt="responding" />
				{:else}
					{paragraph}
					<br />
				{/if}
			{/each}
		</p>
	</div>
	<div class="userSender">
		{#if !message.bot}
			<img src={anonFace} alt="anonFace" />
		{/if}
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		width: 100%;
		.botSender, .userSender {
			width: 2rem;
		}
		.message {
			@include message;
		}
		.botContent {
			margin-left: 0.5rem;
			justify-content: flex-start;
			p {
				border-radius: 0.3rem 1rem 1rem 1rem;
				background-color: color('secondary');
				max-width: 19rem;
				word-wrap: break-word;
			}
		}
		.userContent {
			margin-right: 0.5rem;
			justify-content: flex-end;
			p {
				border-radius: 1rem 0.3rem 1rem 1rem;
				background-color: white;
				max-width: 19rem;
				word-wrap: break-word;
			}
		}
	}
</style> */}