+++
title="responsibility and COMPAS"
description="brief thoughts on the growing ethical concerns software faces"
date=2022-08-06

[taxonomies]
tags = ["law", "politics", "ethics", "algorithms"]
categories = ["software"]
+++

## COMPAS

I had some thoughts after I recently learned about [Equivant (née Northpointe)](https://www.equivant.com/)'s case management and decision software, [COMPAS](https://en.wikipedia.org/wiki/COMPAS_(software)), and wanted to compile those thoughts into writing of some sort. 

As a primer, COMPAS is a software which has been used by counties in the U.S., including in NY, as an aid in deciding [sentencing and likelihood of recidivism](https://s3.documentcloud.org/documents/2840784/Practitioner-s-Guide-to-COMPAS-Core.pdf) for a given criminal. In theory, COMPAS' goal is to collect a series of data about a criminal such as vocational history, history of substance abuse, statuses of familial relationships, and other "tells" of financial and social instabilities which can then be used to assign risk scores to individuals. These risk scores are then factored into an equation as weights to determine a subject's likelihood of recidivism. 

## Responsibility

It will probably come as no surprise to some that the prevalence of computers and technology has led us as a society towards leveraging software as an aid to such fundemental social duties as the legal system. For example, hearing about COMPAS, I was not initially surprised that such a software exists; nevertheless, after marinating on the idea for some time, the thought of such a software eventually gave me pause.

Ignoring the obviously qualms that one ought to have with a system like COMPAS, such as its emphasis on probability of recidivism feeling almost like an implicit dismissal of the possibility for restorative justice and rehabilitation of criminals, I thought to myself whether or not something like COMPAS *should* exist. The obvious and immediate correlation between a government using a system like COMPAS, and the dystopian sci-fi premise of Philip K. Dick's [The Minority Report](https://en.wikipedia.org/wiki/The_Minority_Report) sprung to my mind. Such an association prompted a further sobering examination of myself regarding software development and responsibility.

- Am I, as a software engineer, being **responsible** with my work? 

- What does it mean for software to be **ethical**? 

- Just because we are *able* to use software for a traditionally-human task, ***should we***?

It's questions like these that I believe are important for software engineers to ponder, not only in order to find their own answers to such questions, but also so that they keep them in mind during the next seemingly-innocuous discovery phase of a project. I'm reminded of Uncle Bob's [talk on the future of programming](https://www.youtube.com/watch?v=ecIWPzGEbFc), where he mentions the idea of the dangers of software bugs being harbingers of the possibility of further regulation in the software industry. The software industry is currently in a particularly interesting place, where most government regulation reagarding software development is still in a very laissez-faire state. So it's important to remember that this means that as engineers, we are the arbiters of not only what can and cannot be done, but more imporantly what *should* and *shouldn't* be done.

## Inspiration and further reading:

[1: How We Analyzed the COMPAS Recidivism Algorithm](https://www.propublica.org/article/how-we-analyzed-the-compas-recidivism-algorithm)

[2: The effectiveness of relapse prevention with offenders: a meta-analysis](https://pubmed.ncbi.nlm.nih.gov/14526593/)

[3: Predictive Prosecution](https://digitalcommons.wcl.american.edu/facsch_lawrev/759/)

[4: Randomized Controlled Field Trials of Predictive Policing](https://www.jstor.org/stable/24740149)

[5: The Obligation of the Programmer.](https://blog.cleancoder.com/uncle-bob/2014/11/15/WeRuleTheWorld.html)