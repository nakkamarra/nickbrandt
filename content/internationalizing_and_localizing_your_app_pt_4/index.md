+++
title="internationalizing and localizing your app, part 4: maintainability and scalability"
description="fourth and final part of an article about internationalization, orginally posted on the OkCupid tech blog"
date=2021-07-19
+++
# Internationalizing and Localizing Your App, Part 4: Maintainability and Scalability

*In part four of this four part tutorial, learn about the tools and processes that help keep your app internationalized as your product scales.*

*Check out part 3 of this series [here](https://tech.okcupid.com/internationalizing-and-localizing-your-app-part-3-technical-challenges-8d91b6cb9125).*

When it comes to nuanced and sophisticated systems like languages and cultures, there is eventually a limit at which our software and computers can be helpful to us. This may sound a bit discouraging or counterintuitive, since we as engineers want to always do as much as we can with software and push the boundaries of what it is our code can accomplish. However, I’ve come to understand that a human element is necessary at one or many points in the internationalization process to help handle parts of the endless nuance that comes with the territory. Languages were made by humans for humans, and not computers. In most cases, they are not standardized or procedural in their nature, despite us wanting to apply rules to them so that they can be summed up to a problem space that we can solve with code. Truly, there are still some things that humans are better at in this regard than computers. Interpreting and translating content is one area where I would argue we still outpace the machines.

Despite this fact, though, one of the important goals for gauging OkCupid’s success with internationalization has been aiming to minimize human intervention. Of course, humans are still slow and often error-prone. On top of that, it is neither a scalable or maintainable solution for designers, developers, and managers to have to perform tons of tedious, manual work in support of internationalization efforts. We want humans to be able to positively impact our internationalization efforts, but we also want to remove the possibility for humans to negatively affect these efforts, too.

Leaning heavily on automation can help make the pitfalls of this human intervention much more bearable. For example, one particular place we’ve focused heavily on with our internationalization work here at OkCupid has been the automation of extracting and creating our message catalogs, as well as the uploading and downloading of these catalogs to our [TMS (Translation Management Service)](https://en.wikipedia.org/wiki/Translation_management_system). In our case, [our TMS has an integration with GitHub ](https://lokalise.com/product/integrations/source-code/github)which allows us to easily automate the syncing of our message catalogs, which can be handle through some simple GitHub Actions. This allows us to move at a much higher velocity, as developers are not bogged down with manually managing catalogs, and completed translations can be automatically (*well*, with some oversight from developers via pull requests) merged back into our repositories.

Another great way in which we’ve planned for scale is by leveraging our internal release infrastructure, such as feature flagging mechanisms, to manage the development, testing, and deployment of new features and supported languages. We can easily iterate on new localizable designs and test out translations in a new language, all without exposing features that all of our users are not ready to see yet.

It’s almost easy to understate how important this part of the puzzle is for scalability, and how great the work our team here at OkCupid has accomplished. It seems trivial, but this will hopefully allow us to continue forward into new languages and regions, and ensure that our focus on scalability and maintainability takes a front seat, and that’s what we really want.

## Wrapping up

These specific considerations are by no means the entirety of internationalization, as it is such a deep discipline in itself, but hopefully this has been helpful, and can provide you with some good things to think about when working on internationalization your software.

Şimdilik hoşçakal! Goodbye for now! Auf Wiedersehen!
