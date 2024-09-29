---
title: Assignment 3
layout: doc

# assetsPath: ./assets/images/A3/
---

# Pitch
Blocks turns social media into a fully customizable experience. 

Tired of the "settings" or "options" provided by other social media that you aren't sure work? Ever wish you could directly control what media your social media platform serves you? Or endless customizations for the look of your posts?

Give Blocks a try! Easy to use interfaces for all programming skill-levels and total control over your experience on the web. Create your own visual feeds of the internet to share with the world; your own personal window into how you want to see the internet. 

# Functional Design

**app** Blocks \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**include** Sourcing[File]\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**include** Sourcing[Folder]\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**include** Sourcing[URL]

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**include** Labelling

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**include** Templating[Markdown,[Text]]\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**include** Templating[Markdown,[Image]]\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**include** Templating[Markdown,[Text,Image]]

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**include** Posting

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**include** Sorting

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**sync** addSource(file: File, **out** id: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sourcing.register(file, id)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**sync** addSource(folder: Folder, **out** id: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sourcing.register(folder, id)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**sync** addSource(url: URL, **out** id: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sourcing.register(url, id)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**sync** newLabel(label: String, w: float)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Labelling.register(label)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sorting.add(label, w)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**sync** setLabel(label: String, w: float)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sorting.set(label, w)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**sync** addLabel(id: String, label: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Labelling.add(id, label)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**sync** addTemplate(md: Markdown, **out** id: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Templating.add(md, id)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**sync** addTemplate(md: Markdown, **out** id: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Templating.add(md, id)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**sync** addTemplate(md: Markdown, **out** id: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Templating.add(md, id)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**sync** post(tID: String, fID: String, sID: **list** String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sourcing.get(sID,d)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Templating.render(tID, d, rID)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Posting.post(fID, rID)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**sync** feed(fID: String, **out** output: **list** String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Posting.get(fID, feedSet)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sorting.sort(feedSet, output)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**system sync** update(id: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sourcing.update(id)


## Standard Parts

### Sourcing[Target]
**Purpose**\
to provide access to sets of data for content

**Operational Principle**\
after registering the target t, extracting the resource data d and getting id i, looking up i will yield t and getting i will yield d

**State**\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceIDs: **set** String\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contentIDs: **set** String\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source: sourceIDs &rarr; **one** Target\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;content: sourceIDs &rarr; **set** contentIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data: contentIDs &rarr; **set** Data

**Actions**\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;register(t: Target, **out** id: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id not in sourceIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceIDs += id\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id.source := t\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;unregister(id: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id in sourceIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceIDs -= id\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id.source := none\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id.content.data := none\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id.content := none\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lookup(id: String, **out** t: Target)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id in sourceIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;t := id.sources\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;get(id: String, **out** data: Data)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id in contentIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;t := id.content\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**system** update(id: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id in sourceIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contentID not in contentIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id.content += contentID\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contentID.data := Get(id.source)

### Labelling
**Purpose**\
to categorize resource data using labels

**Operational Principle**\
after registering the label l and adding resourceID r to l, looking up l will yield a set including r and getting r will yield the set of l that include r

**State**\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;labels: **set** String\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;labelled: String &rarr; **set** labels\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resources: labels &rarr; **set** String

**Actions**\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;register(l: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;l not in labels\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;labels += l\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;l.resources := {}\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;unregister(l: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;l in labels\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;labels -= l\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;l.resources := none\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;labels.resources -= l\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lookup(l: String, **out** r: **set** String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;l in labels\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;r := l.resources\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;add(r: String, l: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;l in labels\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;r not in l.resources\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;l.resources += r\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;r.labelled += l\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;remove(r: String, l: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;l in labels\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;r in l.resources\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;l.resources -= r\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;r.labelled -= l\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;get(r: String, **out** l: **set** String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;r in labelled\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;l := r.labelled

### Templating[Template,Resources]
**Purpose**\
to render content that is of a type in Resources 

**Operational Principle**\
after adding the template t and getting templateID id, rendering template t with a list of inputs of type Resources will yield a render to display as a post

**State**\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;templateIDs: **set** String\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;templates: templateIDs &rarr; **one** Template\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;renderIDs: **set** String\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;renders: renderIDs &rarr; **one** Template

**Actions**\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;add(t: Template, **out** id: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id not in templateIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;templateIDs += id\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id.templates := t\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;remove(id: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id in templateIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id.templates := none\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;templateIDs -= id\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**system** render(id: String, d: Data, **out** r: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id in templateIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;r not in renderIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;renderIDs += r\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;r.renders := Render(id.templates, d)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**system** getRender(id: String, **out** r: Template)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id in renderIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;r := id.renders

### Posting
**Purpose**\
to group content into a feed set

**Operational Principle**\
after registering feed f with name n, getting the feedID id, posting a renderID r to f, getting f will yield a set of renderIDs that contains r 

**State**\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;feedIDs: **set** String\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;feed: feedIDs &rarr; **set** String\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: feedIDs &rarr; **one** String

**Actions**\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;register(n: String, **out** id: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id not in feedIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;n not in feedIDs.name\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;feedIDs += id\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id.feed := {}\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id.name := n\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;unregister(id: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id in feedIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id.name := none\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id.feed := none\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;feedIDs -= id\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;post(fID: String, rID: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fID in feedIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rID not in fID.feed\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fID.feed += rID\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;unpost(fID: String, rID: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fID in feedIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rID in fID.feed\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fID.feed -= rID\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;get(id: String, **out** f: **set** String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id in feedIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;f := id.feed

### Sorting
**Purpose**\
to order a feed set according to label weights

**Operational Principle**\
after adding label l and weight w, getting l will yield w and sorting a feedSet will yield a sorted set according to the labels and their weights

**State**\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;weights: String &rarr; **one** float

**Actions**\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**system** sort(feedSet: **set** String, **out** sorted: **list** String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sorted := Sort(feedSet)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**system** add(label: String, w: float)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label not in labelIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;labelIDs += label\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label.weights := w\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**system** remove(label: String)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label in labelIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label.weights := none\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;labelIDs -= label\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**system** set(label: String, w: float)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label in labelIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label.weights := w\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**system** get(label: String, **out** w: float)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label in labelIDs\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;w := label.weights

**A NOTE**: I have 3 functions (Get, Render, Sort) in the specification above that are placefillers. I'm not going to outline the construction of these functions as these rely on algorithms and/or types that don't contribute to the concept design of the system beyond the idea. (i.e. "Get"ing is Target specific-we curl to get data from the web, access filesystems to get file/folder data-and "Sort"ing may be done using a variety of sorting algorithms)

## Dependency Diagram
![dependency diagram for Blocks](/../assets/images/A3/dependencydiagram.jpg)

# Wireframes

:construction: :construction: Permanently under construction... :construction: :construction:

# Design Iteration

![design iteration process in sticky notes](/../assets/images/A3/designprocess.jpg)

It took me a while to understand how concepts work and why it would be helpful/useful to use them. I eventually decided to read the paper mentioned in lecture, "Designing Software for Ease of Extension and Contraction" by David Parnas, and, to my surprise, it was a nice read that laid out not only problems I frequently ran into when designing software but also a pretty simple solution.

Follwing the KISS mantra, I cut down the ultimate number of concepts knowing that the general type sets (e.g. Template, Resource[s], Target, Data) would be the sets most likely to grow as functionality expanded.

# Design Tradeoffs
My design is a general take on what it means to post on social media. My hope is that this allows for additional customization (despite for current limited functionality), but this does not come without some tradeoffs:

1. This design can get complicated very fast. With that in mind, this scheme is missing full functionality (mainly deleting or removing objects) within the app. This decision was made in the interest of building a prototype of the idea rather than setting out to make a complete app.
2. The design is so general that it's not immediately apparent that this is a social media app. More generally, this design may be used to create a simple formatted view of the content on the internet. 
3. The main feature that would complete it's "social media"-ness would be the ability to share blocks of code that you use with friends. With such a feature, a community can begin to be built around building and sharing templates or sorting algorithms. In the interest of designing a project that could be completed in roughly 4 weeks without too much stress! It would be a needed feature to continue the project.