---
slug: how-nutgram-was-born
title: How Nutgram Was Born
authors: sergix44
tags: [nutgram, born, why, backstory]
---

# How Nutgram Was Born
> A Love Story Between PHP and Telegram Bots

Sometimes the best projects aren't born from grand visions or marketing strategies - they come from scratching your own itch. That's exactly how [Nutgram](https://nutgram.dev/) came to life: two developers, real problems, and a shared frustration with existing tools.

## Where It All Started

About six years ago, [Luca](https://github.com/Lukasss93) got a simple request in a Telegram group: *"Hey, can you rebuild this file conversion bot that just died?"*

He built [New File Converter Bot](https://t.me/newfileconverterbot) using [TelegramBotPHP](https://github.com/Eleirbag89/TelegramBotPHP). But after a few weeks, the cracks started showing. Everything was arrays - no IDE autocompletion, no type safety, just implicit structures everywhere.

His solution was drastic: fork the whole thing into [telegrambot-php](https://github.com/Lukasss93/telegrambot-php) and convert everything to proper objects. He manually created over 200 classes to implement DTOs. Tedious? Absolutely. Worth it? Hell yes.

Meanwhile, I was on my own parallel journey.

## AnonyMeetBot v1: The BotMan Era

I had built [AnonyMeetBot](https://t.me/AnonyMeetBot) v1 using [BotMan](https://github.com/botman/botman) as an experiment to connect two platforms together: Facebook and Telegram. BotMan seemed like the perfect choice for multi-platform support.

But then Facebook tightened their API requirements and the Facebook support had to be dropped. AnonyMeetBot became Telegram-only, and suddenly BotMan's multi-platform approach felt like overkill. The Telegram implementation was incomplete and didn't really leverage Telegram's unique features.

As the bot grew and gained users, the problems became clear. Being an experimental project, v1 had its share of performance issues. But the real limitation was BotMan itself - too bulky, too generic, and not built to take advantage of what Telegram actually offers. I needed proper middleware, better code organization, and a framework actually built for Telegram.

I also looked at [Zanzara](https://github.com/badfarm/zanzara), which was laser-focused on Telegram, but it got abandoned shortly after I found it.

## Building Nutgram

At some point you just have to build the tool yourself. I started working on AnonyMeetBot v2 from scratch, and with it, a new framework. I took everything I'd learned from BotMan and Zanzara and started designing something better.

The goal was simple: create something 100% Telegram-first, with modern developer experience and no compromises. A framework that understood conversation flows, made middleware feel natural, and gave proper structure without being too opinionated.

Once I had a working v1 of Nutgram, I deployed AnonyMeetBot v2. The improvements were obvious - cleaner architecture, better performance, and actually using Telegram's features properly.

## Two Paths Converge

Around that time, Luca was facing similar issues. His bots were running on telegrambot-php, but he was hitting the same architectural walls. When he discovered Nutgram, he started rewriting his old bots with it.

And then something great happened: he didn't just use it, he started contributing. A lot. He brought fresh perspectives and pushed the framework forward with significant improvements.

We moved the repo into its own organization, and five years ago, Nutgram was officially born.

## Why It Matters

Nutgram wasn't designed in a conference room. It was built because we couldn't find a good framework that provided high-level features for Telegram. Everything we tried was either too limited, too generic for multi-platform support, or abandoned.

We needed conversation management that actually worked, proper middleware, flexible handlers, and full support for Telegram's features. So we built it.

That's really all there is to it. Nutgram exists because we were frustrated with the available options and decided to make something better. Five years later, it's still solving the same problems for developers who want to build serious Telegram bots without fighting their framework.

---

Want to build your next Telegram bot with Nutgram? Check out the [official website](https://nutgram.dev/) and see what a Telegram-first framework feels like.