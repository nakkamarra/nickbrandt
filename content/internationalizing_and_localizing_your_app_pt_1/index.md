+++
title="internationalizing and localizing your app, part 1: understanding different cultures"
description="first part of an article about internationalization, orginally posted on the OkCupid tech blog"
date=2021-07-16
+++
# Internationalizing and Localizing Your App, Part 1: Understanding Different Cultures

*In this four part tutorial, learn how to internationalize your app from a technical perspective and how to think globally about different cultures and customs.*

Perhaps you have just begun a greenfield project (or like us here at OkCupid, are working with a teenaged codebase) and want to internationalize your application. The truth is that [internationalization, localization, and translation](https://en.wikipedia.org/wiki/Internationalization_and_localization) are all incredibly complex undertakings, and there are countless considerations before diving into converting your codebase and user experience to support it. Here are just a few such lessons that we’ve compiled from our learnings here at OkCupid after a major overhaul across all of our platforms to support launching our first non-English translations and localizations.

**Many things change when you cross physical, social, and linguistic borders**. If you want your product to work seamlessly across these borders, it is crucial to recognize that we are only human and thus make various assumptions about other cultures and languages based on those which we are familiar with, and those assumptions naturally carry over into the products and software we create.

Consider, for example, something as simple as the capitalization of characters. It is commonplace on the western, predominantly English-speaking web to use the sociolinguistic effect of capitalization as a way to emphasize and de-emphasize words or phrases. Just think of the difference between receiving a text from a friend that says THIS IS THE BEST DAY OF MY LIFE vs. this is the best day of my life. Given the context of a message between friends, the latter uncapitalized message has almost a deadpan (even possibly interpreted as sarcastic) feeling to it, whereas the first could be interpreted as sincere excitement.

You can find examples of using capitalization as a means of emphasis in countless software user interfaces. Contextually the capitalization here matters, but it operates under an assumption that capitalization doesn’t matter that much. This could be highlighted by contrasting it with a language like German. In German, nouns always have their first letter capitalized as a rule of grammar. Take for example the first line of The Metamorphosis by Kafka, in its original translation:
> Als Gregor Samsa eines **M**orgens aus unruhigen **T**räumen erwachte, fand er sich in seinem **B**ett zu einem ungeheueren **U**ngeziefer verwandelt

And in English (*note*, *we would not capitalize nouns this way in English*):
> As Gregor Samsa awoke from troubled **D**reams one **M**orning, he found himself in his **B**ed, transformed into a monstrous **V**ermin

Seeing a message in German that *does not* follow this rule could be jarring for users who understand this language, as it is technically incorrect grammar to have incorrect capitalization. It’s important to understand the assumption we make by using capitalization for emphatics, because the case is part of the orthography of many languages, and there are even languages without the notion of uppercase and lowercase glyphs. How will your message be interpreted if it does not change the case? This is just one of the many features of a language that are subject to change when translating / localizing from English to other languages.

Alongside that, there are still other more complex language features to solve for, such as [**plural and ordinal rules](http://cldr.unicode.org/index/cldr-spec/plural-rules)** or [**grammatical gender](https://en.wikipedia.org/wiki/Grammatical_gender)**. Our assumptions based on how these features apply to English cause many to overlook the fact that these need to be handled at some point in our software. I’ll go into more depth about these in a later section, but getting these correct is crucial to ensuring a message is clear, grammatically correct, and retains its original intention.

Along with the linguistic assumptions we make, we also make **stylistic assumptions**. Consider an error message being displayed on your site when something goes wrong: *what color will it be?* Most westerners would probably answer red, as the color is often culturally associated with negatives (danger, stoplights, a negative balance). However, in Chinese culture for example, red is associated with positives like happiness and prosperity. A great example of this difference is demonstrated by the contrasting choice of colors in stock markets: Western financial markets use green to signify increase and red to denote decrease, whereas Eastern financial markets will do the exact opposite.

![© AFP/Getty Images](https://cdn-images-1.medium.com/max/2000/1*F5U7ZnPTZVI1me06VUkkcQ.jpeg)*© AFP/Getty Images*

Stylistically, we can’t even assume that our colors and themes make sense. We need to make sure that our assumptions are curbed here, too. We should provide layouts, fonts, and colors that make sense to our users given the context of their language, location, and use-cases.

Lastly, it is imperative that we recognize our **cultural assumptions**. For a product like OkCupid, it is a fundamental feature to be able to specify things about yourself like your pronouns, sexuality, and drug use, because these are part of your identity, and subsequently are crucially identifying characteristics of those you’d like to date. How could we even handle the fact that some languages like Turkish do not have the concept of gendered / non-gendered pronouns?

Not only that, but despite this specificity being something so core and fundamental to OkCupid’s product and beliefs, there are still places in the world in which identifying as gay or as a weed smoker (even if just on an internet platform) can lead to criminal charges. We certainly don’t want our software to be the cause of problems like this for our users. Truly, this is both a difficult philosophical and engineering problem; however, it’s an important highlight of the cultural assumptions we make with our software.

*Check out part 2 of this series [here](https://tech.okcupid.com/internationalizing-and-localizing-your-app-part-2-web-tooling-56cc7be73d32).*
