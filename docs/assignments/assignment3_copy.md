---
title: Assignment 3 (Revised/Updated)
layout: doc

# assetsPath: ./assets/images/A3/
---

# Pitch
Blocks turns social media into a fully customizable experience. 

Tired of the "settings" or "options" provided by other social media that you aren't sure work? Ever wish you could directly control what media your social media platform serves you? Or endless customizations for the look of your posts?

Give Blocks a try! Easy to use interfaces for all programming skill-levels and total control over your experience on the web. Create your own visual feeds of the internet to share with the world; your own personal window into how you want to see the internet. 

# Functional Design

**app** Blocks

**include** Authenticating  
**include** Friending[ `User` ]  
**include** Sessioning[ `User` ]  
**include** Logging[ `User` ]  
**include** Sourcing[ `User` ]  
**include** Labelling[ `User`, `Content` ]  
**include** Templating[ `User`, `Content` ]  
**include** Posting[ `User`, `Render` ]  
**include** Sorting[ `User`, `Label`, `Feed` ] 

**sync** getSessionUser(session: `Session`, **out** body: `User`)
```
    Sessioning.getUser(session, user)
    Authing.getUserById(user, body)
```
**sync** getUsers(**out** body: **list** `User`)
```
    Authing.getUsers(body)
```
**sync** getUser(username: `string`, **out** body: `User`)
```
    Authing.getUserByUsername(username, body)
```
**sync** createUser(session: `Session`, username: `string`, password: `string`, **out** body: `User`)
```
    Sessioning.isLoggedOut(session)
    Authing.updateUsername(username, password, body)
```
**sync** updateUsername(session: `Session`, username: `string`)
```
    Sessioning.getUser(session, user)
    Authing.updateUsername(user, username)
```
**sync** updatePassword(session: `Session`, currentPassword: `string`, newPassword: `string`)
```
    Sessioning.getUser(session, user)
    Authing.updatePassword(user, currentPassword, newPassword)
```
**sync** deleteUser(session: `Session`, **out** body: `DeleteResult`)
```
    Sessioning.getUser(session, user)
    Sessioning.end(session)
    Authing.delete(user, body)
```
**sync** logIn(session: `Session`, username: `string`, password: `string`)
```
    Authing.authenticate(username, password, user)
    Sessioning.start(session, user)
```
**sync** logOut(session: `Session`)
```
    Sessioning.end(session)
```

**sync** createPost(session: `Session`, feedId: `Feed`, contentId: `Render`, **out** body: `ObjectId`)
```
    Sessioning.getUser(session, user)
    Posting.post(feedId, user, contentId, body)
```
**sync** getPosts(postId: **opt** `Post`, author: `User`, **out** body: **set** `Post`)
```
    Posting.get(postId, author, body)
```
**sync** deletePost(session: `Session`, postId: `Post`, **out** body: `DeleteResult`)
```
    Sessioning.getUser(session, user)
    Posting.unpost(postId, user, body)
```

**sync** getFriends(session: `Session`, **out** body: `string[]`)
```
    Sessioning.getUser(session, user)
    Friending.getFriends(user, ids)
    Authing.idsToUsernames(ids, body)
```
**sync** deleteFriendship(session: `Session`, friendUsername: `string`)
```
    Sessioning.getUser(session, user)
    Authing.getUserByUsername(friendUsername, friend)
    Friending.removeFriend(user, friend._id)
```
**sync** getRequests(session: `Session`, **out** body: **list** `FriendRequest`)
```
    Sessioning.getUser(session, user)
    Friending.getRequests(user, body)
```
**sync** createFriendRequest(session: `Session`, to: `string`, **out** body: `FriendRequest`)
```
    Sessioning.getUser(session, user)
    Authing.getUserByUsername(to, toOid)
    Friending.sendRequest(user, toOid, body)
```
**sync** deleteFriendRequest(session: `Session`, to: `string`)
```
    Sessioning.getUser(session, user)
    Authing.getUserByUsername(to, toUser.toOid)
    Friending.removeRequest(user, toOid)
```
**sync** acceptFriendRequest(session: `Session`, from: `string`, **out** body: **tuple** `ObjectId`)
```
    Sessioning.getUser(session, user)
    Authing.getUserByUsername(from, fromUser.fromOid)
    Friending.acceptRequest(fromOid, user, body)
```
**sync** rejectFriendRequest(session: `Session`, from: `string`, **out** body: `ObjectId`)
```
    Sessioning.getUser(session, user)
    Authing.getUserByUsername(from, fromUser.fromOid)
    Friending.rejectRequest(fromOid, user, body)
```

**sync** createSource(session: `Session`, target:  `SourceTarget`, uri: `string`, **out** body: `ObjectId`)
```
    Sessioning.getUser(session, user)
    Sourcing.register(target, uri, user, body)
```
**sync** getSource(session: `Session`, sourceId: `Source`, **out** body: `Source`)
```
    Sessioning.getUser(session, user)
    Sourcing.lookupOne(sourceId, user, body)
```
**sync** getSources(session: `Session`, **out** body: **set** `Source`)
```
    Sessioning.getUser(session, user)
    Sourcing.lookupMany(user, body)
```
**sync** deleteSource(session: `Session`, sourceId: `Source`, **out** body: `DeleteResult`)
```
    Sessioning.getUser(session, user)
    Sourcing.unregister(sourceId, user, body)
```

**sync** getContent(session: `Session`, contentId: `Content`, **out** body: `Content`)
```
    Sessioning.getUser(session, user)
    Sourcing.get(contentId, user, body)
```

**sync** createLabel(session: `Session`, label: `string`, **out** body: `ObjectId`)
```
    Sessioning.getUser(session, user)
    Labelling.register(label, user, body)
```
**sync** getLabel(session: `Session`, label: `string`, **out** body: `Label`)
```
    Sessioning.getUser(session, user)
    Labelling.lookup(label, user, body)
```
**sync** addLabel(session: `Session`, contentId: `ObjectId`, labelId: `ObjectId`)
```
    Sessioning.getUser(session, user)
    Labelling.add(contentId, labelId, user)
```
**sync** removeLabel(session: `Session`, contentId: `ObjectId`, labelId: `ObjectId`, **out** body: `DeleteResult`)
```
    Sessioning.getUser(session, user)
    Labelling.remove(contentId, labelId, user, body)
```
**sync** deleteLabel(session: `Session`, label: `string`, **out** body: `DeleteResult`)
```
    Sessioning.getUser(session, user)
    Labelling.unregister(label, user, body)
```

**sync** createTemplate(session: `Session`, template: `string`, numInputs: `integer`, **out** body: `ObjectId`)
```
    Sessioning.getUser(session, user)
    Templating.add(user, template, numInputs, body)
```
**sync** getTemplate(session: `Session`, templateId: **opt** `ObjectId`, **out** body: `Template`)
```
    Sessioning.getUser(session, user)
    if (templateId)
        Templating.lookupById(user, templateId, body)
    else
        Templating.lookupByUser(user, body)
```
**sync** updateTemplate(session: `Session`, templateId: `ObjectId`, newContent: `string`, numInputs: `integer`)
```
    Sessioning.getUser(session, user)
    Templating.update(user, templateId, newContent, numInputs)
```
**sync** deleteTemplate(session: `Session`, templateId: `ObjectId`, **out** body: `DeleteResult`)
```
    Sessioning.getUser(session, user)
    Templating.remove(user, templateId, body)
```

**sync** createRender(session: `Session`, templateId: `ObjectId`, contentIds: **set** `ObjectId`, **out** body: `ObjectId`)
```
    Sessioning.getUser(session, user)
    Templating.render(user, templateId, contentIds, body)
```
**sync** getRenders(session: `Session`, renderId: **opt** `ObjectId`, **out** body: **set** `Render`)
```
    Sessioning.getUser(session, user)
    if (renderId)
        [Templating.getById(user, renderId, body)]
    else
        Templating.getByUser(user, body)
```
**sync** deleteRender(session: `Session`, renderId: `ObjectId`, **out** body: `DeleteResult`)
```
    Sessioning.getUser(session, user)
    Templating.delete(user, renderId, body)
```

**sync** createFeed(session: `Session`, name: `string`, **out** body: `ObjectId`)
```
    Sessioning.getUser(session, user)
    Posting.register(name, user, body)
```
**sync** getFeed(session: `Session`, feedId: **opt** `ObjectId`, **out** body: **set** `Feed`)
```
    Sessioning.getUser(session, user)
    Posting.lookup(feedId, user, body)
```
**sync** updateFeedName(session: `Session`, feedId: `ObjectId`, newName: `string`)
```
    Sessioning.getUser(session, user)
    Posting.updateName(feedId, user, newName)
```
**sync** deleteFeed(session: `Session`, feedId: `ObjectId`, **out** body: `DeleteResult`)
```
    Sessioning.getUser(session, user)
    Posting.deregister(feedId, user, body)
```

## Standard Parts

### Authenticating
**NOTE**: using the concept as presented in [Lecture 6 (slide 42)](https://61040-fa24.github.io/assets/lecture-notes/L06-concept-design-moves.pdf), yet amended to match project
#### Purpose
authenticate users so that app users correspond to people

#### Operational Principle
after a user registers with a username and password pair, they can authenticate as that user by providing the pair: register \(n, p, u\); authenticate \(n, p, u'\) \{u' = u\}

#### State
registered: **set** `User`  
username,password: registered -> **one** `string`

#### Actions
register(username: `string`, password: `string`, **out** user: `ObjectId`)
```
    { username: username } not in registered
    user := { username: username, password: password }
    registered += user
```
getUserById(_id: `ObjectId`, **out** user: `User`)
```
    user := { _id: _id }
    user in registered
    user from registered
```
getUserByUsername(username: `string`, **out** user: `User`)
```
    user := { username: username }
    user in registered
    user from registered
```
idsToUsernames(ids: **set** `ObjectId`, **out** usernames: **set** `string`)
```
for _id in ids
    user := { _id: _id }
    user in registered
    user from registered
    usernames += user.username
```
getUsers(username: `string`, **out** users: **set** `User`)
```
    if (username is empty) users := registered
    else 
        { username: username } from registed
```
authenticate(username: `string`, password: `string`, **out** body: `ObjectId`)
```
    user := { username: username, password: password }
    user in registered
    user from registered
    body := user._id
```
updateUsername(_id: `ObjectId`, username: `string`, **out** body: `UpdateResult`)
```
    { username: username } not in registered
    { _id: _id } in registered
    user := { _id: _id }
    user from registered
    user.username := username
```
updatePassword(_id: `ObjectId`, currentPassword: `string`, newPassword: `string`, **out** body: `UpdateResult`)
```
    user := { _id: _id }
    user in registered
    user from registered
    currentPassword is user.password
    user.password := newPassword
```
delete(_id: `ObjectId`, **out** body: `DeleteResult`)
```
    user := { _id: _id }
    user in registered
    user from registered
    registered -= user
```

### Sessioning[User]
**NOTE**: using the concept as presented in [Lecture 6 (slide 43)](https://61040-fa24.github.io/assets/lecture-notes/L06-concept-design-moves.pdf), yet amended to match project
#### Purpose
 enable authenticated actions for an extended period of time

#### Operational Principle
after a session starts \(and before it ends\), the getUser action returns the user identifed at the start: start \(u, s\); getUser \(s, u'\) \{u' = u\}

#### State
active: **set** `Session`  
user: active **one** `User`

#### Actions
start(session: `Session`, user: `ObjectId`)
```
    session := { user: user }
    isLoggedOut(session)
    active += session
```
getUser(session: `Session`, **out** body: `ObjectId`)
```
    isLoggedIn(session)
    session from active
    body := session.user._id
```
end(session: `Session`)
```
    isLoggedIn(session)
    session from active
    active -= session
    session.user := none
```
**system** isLoggedIn(session: `Session`)
```
    session in active
    session.user is not none
```
**system** isLoggedOut(session: `Session`)
```
    session not in active
```

### Logging[User]
#### Purpose
to keep a log of user's requests.

#### Operational Principle
logs a new line in output

#### State
output: **one** `string`  
logs: **set** `Log`  
date: logs -> **one** `Date`  
user: logs -> **one** `User`  
method: logs -> **one** `string`  
resource: logs -> **one** `string`  
query: logs -> **one** `string`

#### Actions
**system** setOutput(fileName: `string`)
```
    if fileName is empty string
        print to console
    else 
        print to file with name fileName
```
**system** logGet(user: `User`, date: `Date`, resource: `string`, query: `string`)
```
    newLog := { date: date
                user: user
                mehtod: "GET"
                resource: resource
                query: query }
    newLog not in logs
    addLog(newLog)
```
**system** logPost(user: `User`, date: `Date`, resource: `string`, query: `string`)
```
    newLog := { date: date
                user: user
                mehtod: "GET"
                resource: resource
                query: query }
    newLog not in logs
    addLog(newLog)
```
**system** logPut(user: `User`, date: `Date`, resource: `string`, query: `string`)
```
    newLog := { date: date
                user: user
                mehtod: "GET"
                resource: resource
                query: query }
    newLog not in logs
    addLog(newLog)
```
**system** logDelete(user: `User`, date: `Date`, resource: `string`, query: `string`)
```
    newLog := { date: date
                user: user
                mehtod: "GET"
                resource: resource
                query: query }
    newLog not in logs
    addLog(newLog)
```
**system** addLog(log: `Log`)
```
    if output is empty string
        print log to console
    else 
        print log to file with name output
```

### Friending[User]
#### Purpose
to allow users to become friends

#### Operational Principle

#### State
friends: **set** `Friendship`  
user1,user2: friends -> **one** `User`

requests: **set** `FriendRequest`  
to,from: requests -> **one** `User`  
status: requests -> **one** `string`

#### Actions
getRequests(user: `User`, **out** body: **list** `FriendRequest`)
```
    rt := { "$or": [{to: user }, { from: user }]}
    rt from requests
    body += rt
```
createRequest(from: `User`, to: `User`, **out** body: `ObjectId`)
```
    from is not to
    { user1: from, user2: to } not in friends
    { user1: to, user2: from } not in friends
    { from: from, to: to } not in requests
    { from: to, to: from } not in requests
    requests += { from: from, to: to, status: "pending" }
```
removeRequest(from: `User`, to: `User`)
```
    { from: from, to: to } in requests
    request from requests 
    requests -= { from: from, to: to}
```
acceptRequest(from: `User`, to: `User`, **out** body: **tuple** `ObjectId`)
```
    { from: from, to: to, status: "pending"} in requests
    requests -= { from: from, to: to, status: "pending" }
    requests += { from: from, to: to status: "accepted" }
    friends += { user1: from, user2: to }
```
rejectRequest(from: `User`, to: `User`, **out** body: `ObjectId`)
```
    { from: from, to: to, status: "pending" } in requests
    requests -= { from: from, to: to, status: "pending" }
    requests += { from: from, to: to status: "rejected" }
```
removeFriend(user: `User`, friend: `User`)
```
    friendship := { "$or": [{ user1: user, user2: friend }, { user1: friend, user2: user }]} in friends
    friends -= friendship
```
getFriends(user: `User`, **out** body: **list** `User`)
```
    friendships := [{ user1: user }] in friends
    body += friendships.user2
    friendships := [{ user2: user }] in friends
    body += friendships.user1
```

### Sourcing[User]
#### Purpose
to provide access to sets of data for content

#### Operational Principle
after registering the target t, extracting the resource data d and getting id i, looking up i will yield t and getting i will yield d

#### State
**const** SourceTarget: **set** `string`

sources: **set** `Source`  
user: sources -> **one** `User`  
pathUri: sources -> **one** `string`  
target: sources -> **one** `SourceTarget`  
contentIDs: sources -> **set** `Content`

content: **set** `Content`  
user: content -> **one** `User`  
source: content -> **one** `Source`  
body: content -> **one** `string`

#### Actions
register(target: `SourceTarget`, uri: `string`, user: `User`, **out** body: `ObjectId`)
```
    source := { user: user,
                pathUri: uri,
                target: target,
                contentIDs: {} }
    source not in sources
    sources += source
    body := source._id
```
unregister(source: `ObjectId`, user: `User`, **out** body: `DeleteResult`)
```
    source in sources
    source from sources
    source.user is user
    content -= source.contentIDs
    sources -= source
```
lookupOne(sourceId: `ObjectId`, user: `User`, **out** body: `Source`)
```
    source := { _id: sourceId }
    source in sources
    source from sources
    source.user is user
    body := source
```
lookupMany(user: `User`, **out** body: **set** `Source`)
```
    source := { user: user }
    [source] from sources
    body := source
```
get(contentId: `ObjectID`, user: `User`, **out** body: `Content`)
```
    c := { _id: contentId }
    c in content
    c from content
    c.user is user
    body := c
```
**system** update(sourceId: `ObjectId`)
```
    source := { _id: sourceId }
    source in sources
    source from sources
    contentID not in source.contentIDs
    source.contentIDs += contentID
    content += { _id: contentID,
           source: source._id
           user: source.user
           body: Get(source.target, source.pathUri) } 
```

### Labelling[User,Content]
#### Purpose
to categorize resource data using labels

#### Operational Principle
after registering the label l and adding resourceID r to l, looking up l will yield a set including r and getting r will yield the set of l that include r

#### State
labels: **set** `Label`  
user: labels -> **one** `User`  
label: labels -> **one** `string`  
resources: labels -> **set** `ObjectId`

#### Actions
register(label: `string`, user: `User`, **out** body: `ObjectId`)
```
    l := { label: label, user: user }
    l not in labels
    l.resources := {}
    labels += l
    body = l._id
```
unregister(label: `string`, user: `User`, **out** body: `DeleteResult`)
```
    l := { label: label, user: user }
    l in labels
    l from labels
    labels -= l
```
lookup(label: `string`, user: `User`, **out** body: `Label`)
```
    body := { label: label, user: user }
    body in labels
    body from labels
```
lookupId(_id: `ObjectId`, user: `User`, **out** body: `Label`)
```
    body := { _id: _id, user: user }
    body in labels
    body from Labels
```
add(contentId: `Content`, label: `ObjectId`, user: `User`)
```
    l := { label: label, user: user }
    l in labels
    l from labels
    l.resources += resource
```
remove(contentId: `Content`, label: `ObjectId`, user: `User`, **out** body: `DeleteResult`)
```
    l := { label: label, user: user }
    l in labels
    l from labels
    resource in l.resources
    l.resources -= resource
```
get(contentId: `Content`, **out** body: **set** `Label`)
```
    body := { resources: { resource } }
    body from labels
```

### Templating[User,Content]
#### Purpose
to render content that is of a type in Resources 

#### Operational Principle
after adding the template t and getting templateID id, rendering template t with a list of inputs of type Resources will yield a render to display as a post

#### State
templates: **set** `Template`  
user: templates **one** `User`  
body: templates **one** `string`  
numInputs: templates **one** { n: `integer` | n >= 0 }  
templateRenders: templates **set** `Render`

renders: **set** `Render`  
user: renders **one** `User`  
contentInputs: renders **set** `Content`  
body: renders **one** `string`

#### Actions
add(user: `User`,  body: `string`, numInputs: `integer`, **out** body: `ObjectId`)
```
    template := { user: user, body: body, numInputs: numInputs }
    template not in templates
    templates += template
```
lookupById(user: `User`, template: `ObjectId`, **out** body: `Template`)
```
    body := { user: user, _id: template }
    body in templates
    body from templates
```
lookupByUser(user: `User`, **out** body: **set** `Template`)
```
    body := { user: user }
    body in templates
    [body] from templates
```
update(user: `User`, templateId: `Template`, content: `string`, numInputs: `integer`)
```
    temp := { user: user, _id: template }
    temp in templates
    temp from templates
    temp.content := content
    temp.numInputs := numInputs
```
remove(user: `User`, templateId: `Template`, **out** body: `DeleteResult`)
```
    temp := { user: user, _id: template }
    temp in templates
    temp from templates
    templates -= temp
```
render(user: `User`, templateId: `Template`, contentIds: **set** `content`, **out** body: `ObjectId`)
```
    newRender :=  { user: user,  contentInputs: content, body: Render(template, content) }
    newRender not in renders
    newRender not in template.templateRenders
    renders += newRender
    template.templateRenders += newRender
    body := newRender._id
```
getById(user: `User`, renderId: `ObjectId`, **out** body: `Render`)
```
    body := { user: user, _id: render }
    body in renders
    body from renders
```
getByUser(user: `User`, **out** body: **set** `Render`)
```
    [body] := { user: user }
    body in renders
    [body] from renders
```
delete(user: `User`, renderId: `ObjectId`, **out** body: `DeleteResult`)
```
    render := { user: user, _id: renderId }
    render in renders
    render from renders
    renders -= render
```

### Posting[User,Render]
#### Purpose
to group content into a feed set

#### Operational Principle
after registering feed f with name n, getting the feedID id, posting a renderID r to f, getting f will yield a set of renderIDs that contains r 

#### State
posts: **set** `Post`  
author: posts **one** `User`  
content: posts **one** `Render`

feeds: **set** `Feed`  
owner: feeds **one** `User`  
name: feeds **one** `string`  
posts: feeds **set** `Post`

#### Actions
register(name: `string`, owner: `User`, **out** body: `ObjectId`)
```
    feed := { name: name, user: user }
    feed not in feeds
    feed.posts := {}
    feeds += feed
    body := feed._id
```
lookup(feedId: **opt** `ObjectId`, owner: `User`, **out** body: **set** `Feed`)
```
    if feedId
        body := { _id: feedId, owner: owner }
    else 
        body := { owner: owner }
    [body] from feeds
```
updateName(feedId: `ObjectId`, owner: `User`, newName: `string`)
```
    feed := { _id: feedId, owner: owner }
    feed in feeds
    feed from feeds
    feed.name := newName
```
deregister(feedId: `ObjectId`, owner: `User`, **out** body: `DeleteResult`)
```
    feed := { _id: feedId, owner: owner }
    feed in feeds
    feed from feeds
    feeds -= feed
```
post(feedId: `ObjectId`, author: `User`, content: `Render`, **out** body: `ObjectId`)
```
    feed := { _id: feedId, owner: auther }
    feed in feeds
    feed from feeds
    post := { author: author, content: content }
    post not in posts
    posts += post
    feed.posts += post._id
```
get(postId: **opt** `ObjectId`, author: `User`, **out** body: **set** `Post`)
```
    body := { author: author }
    if postId
        body._id := postId
    [body] from feeds
```
unpost(postId: `ObjectId`, author: `User`, **out** body: `DeleteResult`)
```
    feed := { owner: author, feeds: { postId } }
    feed in feeds
    [feed] from feeds
    [feed].posts -= postId
    post := { _id: postId, author: author }
    post in posts
    post from posts
    posts -= post
```

### Sorting[User,Label,Feed]
#### Purpose
to order a feed set according to label weights

#### Operational Principle
after adding label l and weight w, getting l will yield w and sorting a feedSet will yield a sorted set according to the labels and their weights

#### State
sorts: **set** `Sort`  
title: sorts **one** `string`  
owner: sorts **one** `User`  
labels: sorts **set** `Label`  
weights: labels **one** `number`

#### Actions
register(title: `string`, owner: `User`, **out** body: `ObjectId`)
```
    sort := { owner: owner, title: title }
    sort not in sorts
    sort.labels := {}
    sorts += sort
    body := sort._id
```
updateTitle(sortId: `ObjectId`, owner: `User`, title: `string`)
```
    sort := { _id: sortId, owner: owner }
    sort in sorts
    sort from sorts
    sort.title := title
```
deregister(sortId: `ObjectId`, owner: `User`, **out** body: `DeleteResult`)
```
    sort := { _id: sortId, owner: owner }
    sort in sorts
    sort from sorts
    sorts -= sort
```
add(sortId: `ObjectId`, owner: `User`, label: `Label`, weight: `number`)
```
    sort := { _id: sortId, owner: owner }
    sort in sorts
    sort from sorts
    label not in sort.labels
    sort.labels += label
    label from sort.labels
    label.weight := weight
```
get(sortId: `ObjectId`, owner: `User`, **out** body: `Sort`)
```
    sort := { _id: sortId, owner: owner }
    sort in sorts
    body := sort from sorts
```
set(sortId: `ObjectId`, owner: `User`, label: `Label`, weight: `number`)
```
    sort := { _id: sortId, owner: owner }
    sort in sorts
    sort from sorts
    label in sort.labels
    label from sort.labels
    label.weight := weight
```
remove(sortId: `ObjectId`, owner: `User`, label: `Label`, **out** body: `DeleteResult`)
```
    sort := { _id: sortId, owner: owner }
    sort in sorts
    sort from sorts
    sort.labels -= labels
```

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

# Reflections on Design
## A Concept's State and Actions are Database Synchronizations
Were we to view the database as a concept, the functions within each action are synchronizations of a database Concept. aThese functions are not actions, not only because we do not specify what particular db carries out these functions, but also concepts do not have intrinsic dependencies with other concepts, i.e. they would not be accessible . On the first point, were we to need to support Google Sheets for a backend (as many small businesses and organizations often do), that should be as easy as defining a "sheets db interface" that implements the necessary database synchronizations and passes that to the server for use. 

I have a section [below](#defining-database-synchronizations) that builds on the spec language presented in class and specifies not only the relational state of my app but also the CRUD operations and filters given by MongoDB. These feel like appropriate starting point in terms of basic db functionality. I'm choosing to make my spec more *in-depth* because it's the formalization of a spec that allows for automatic code generation. I explain this more in detail [below](#why-formalize), but, essentially, this allows for us to skip a lot of the boiler-plate/repetition that is needed to design (and re-design) our app, while keeping both of our front and back ends synchronized.

Along with each specification function, I wrote an associated shorthand (again, largely used from the lectures). Each of these shorthands has an associated function that would need to be implemented in the backend. 

**Note**: the wonderful and helpful TAs that structured the codebase included a file `/server/framework/doc.ts` that demostrates what it looks like for these function to be implemented as part of the backend. This TS file would serve as the interface between the database synchronizations specified below for the actual implementation. 

## Defining Database Synchronizations
I wanted to write this part down to have a standard to refer to as I add to the project. It allows me to build based on the CRUD operations defined by MongoDb.

### Relational state
[Source](https://61040-fa24.github.io/assets/lecture-notes/L04-towards-concepts.pdf)

Setting types

**const** TypeName -> **set** Type, to represent constant set of values  
TypeName -> **set** Type

Binary relations

property: TypeName -> **Multiplicity** Type  
property: TypeName -> **Multiplicity** Type  
property1, property2: TypeName -> **Multiplicity** Type  
property: TypeName -> **Multiplicity** {subName: Type | subName constraint, ...}, e.g. subName > 0 if Type is Integer

| Value | Multiplicity |
| ----- | ------------ | 
| >= 0 | **set** |
| >= 1 | **some**, **+** |
| <= 1 | **opt**, **lone**, **?** |
|  = 0 | **one**, **!** |

### CRUD Operations
[Source](https://61040-fa24.github.io/assets/lecture-notes/L07-data-design.pdf)
#### Create
| Function Operation | Shorthand |
| ------------------ | --------- |
| `createOne({...})` | `stateVariable += variableName` |
|                    | `stateVariable += {property1: Object, property2: Object, ...}` |
| `createMany([{...}, {...}, ...])` | `stateVariable += [variableName1, variableName2, ...]` |
|                    | `stateVariable += [{property1: Object, property2: Object, ...}]` |
#### Read
| Function Operation | Shorthand |
| ------------------ | --------- |
| `readOne({...})`   | `Filter from stateVariable` |
|                    | `{property1: Object, property2: Object, ...} from stateVariable` |
| `read({...})`      | `[Filter] from stateVariable` |
|                    | `[{property1: Object, property2: Object, ...}] from stateVariable` |

#### Update
| Function Operation | Shorthand |
| ------------------ | --------- |
| `updateOne({...}, {"$set": {...}})` | `variableName.property := Object` |
|                                     | `Filter in stateVariable := { property1: Object, property2: Object, ... }` |
| `updateMany({...}, {"$set": {...}})` | `[Filter] in stateVariable := { property: Object, ...}` |
|                                      | `[Filter1, Filter2, ...] in stateVariable := { property: Object, ...}` |
| `replaceOne({...}, {...})` | `Filter in stateVariable := variableName` |

#### Delete
| Function Operation | Shorthand |
| ------------------ | --------- |
| `deleteOne({...})` | `stateVariable -= variableName` |
|                    | `stateVariable -= [variableName1, variableName2, ...]` |
| `deleteMany({...})` | `stateVariable -= [variableName1, varibleName2, ...]` |
|                     | `stateVariable -= [{...}, {...}, ...]` |

#### Filters
I use filters above without explicitly stating, e.g. take this code snippet from the Labelling concept above:
```
    l := { label: label, user: user }
    l in labels
    l from labels
    ...
```
In this code snippet, the `l` variable begins as a filter, but after the line `l from labels` the `l` variable becomes the instance read from labels.

Beyond a direct mapping of fields to values of the object, there are additional fields that may be used to filter results. 

| Comparison Query Operator `Filter` | Description |
| ---------------------------------- | ----------- |
| `$eq` | Matches values that are equal to a specified value. |
| `$gt` | Matches values that are greater than a |specified value. |
| `$gte` | Matches values that are greater than or equal to a specified value. |
| `$in` | Matches any of the values specified in an array. |
| `$lt` | Matches values that are less than a specified value. |
| `$lte` | Matches values that are less than or equal to a specified value.|
| `$ne` | Matches all values that are not equal to a specified value. |
| `$nin` | Matches none of the values specified in an array. |

**NOTE**: Comparison operators return data based on value comparisons. [Source](https://www.mongodb.com/docs/manual/reference/operator/query-comparison/) 

| Logical Query Operator `Filter` | Description |
| ------------------------------- | ----------- |
| `$and` | Joins query clauses with a logical AND returns all documents that match the conditions of both clauses. |
| `$not` | Inverts the effect of a query predicate and returns documents that do not match the query predicate. |
| `$nor` | Joins query clauses with a logical NOR returns all documents that fail to match both clauses. |
| `$or` | Joins query clauses with a logical OR returns all documents that match the conditions of either clause. |

**NOTE**: Logical operators return data based on expressions that evaluate to true or false. [Source](https://www.mongodb.com/docs/manual/reference/operator/query-logical/)

| Element Query Operator `Filter` | Description |
| ------------------------------- | ----------- |
| `$exists` | Mathces documents that contain or do not contain a specified field, including documents where the field value is `null` |
| `$type` | Selects documents if a field is of the specified type. |

**NOTE**: Element operators return data based on field existence or data types. [Source](https://www.mongodb.com/docs/manual/reference/operator/query-element/)

| Evaluation Query Operator `Filter` | Description |
| ------------------------------- | ----------- |
| `$expr` | Allows use of aggregation expressions within the query language. |
| `$jsonSchema` | Validate documents against the given JSON Schema. |
| `$mod` | Performs a modulo operation on the value of a field and selects documents with a specified result. |
| `$regex` | Selects documents where values match a specified regular expression. |
| `$where` | Matches documents that satisfy a JavaScript expression. |

**NOTE**: Evaluation operators return data based on evaluations of either individual fields or the entire collection's documents. [Source](https://www.mongodb.com/docs/manual/reference/operator/query-evaluation/)

Example filter use:
```
    l := { label: ( `$regex`: `.` ), user: user }
    l in labels
    l from labels
    ...
```
This would get all labels of a user. Note: this is a terrible way of expressing that you want all labels of a user; this example is purely for demonstrative purposes.

**More Query and Projection Operators Found [Here](https://www.mongodb.com/docs/manual/reference/operator/query/).**

### Representation Invariants

Listed below are operations that will assert that certain representation requirements are met, i.e. an error will be throw if the conditions aren't met.

| Function Operation | Shorthand |
| ------------------ | --------- |
| `doesExist({...})` | `variableName in stateVariable` |
|                    | `Filter in stateVariable` |
| `doesNotExist({...})` | `variableName not in stateVariable` |
|                       | `Filter not in stateVariable` |
| `equal({...}, {...})` | `variableName is Object` |
|                       | `Object is Object` |
| `notEqual({...}, {...})` | `variableName is not Object` |
|                          | `Object is not Object` |
| `sizeOf(Property)` | `variableName size of Property` |
| `if property !== null`\*  | `if property` |
| `if property === null`\*\* | `else` |

**Notes**  
\* This function may be used on types that have an optional (`opt`) multiplicity to check if variable is provided.  
\*\* Works in conjunction with `if ...` to specify the path taken if the optional variable is not provided as part of a response. This is optional and does not need to be specified for every `if`.

## Why formalize?
I've been reflecting on the talks given by Daniel Jackson (at least those on Youtube) about the Concepts idea. My personal favorite (because I believe it's the most in-depth) was this [one](https://www.youtube.com/watch?v=pCr3GjdoTbg). Early on he explains how he believes the true innovation of the web is the URL because it eliminated some of the steps that made using the web, then, frustrating. 

> **a product is defined by a scenario**
> 
> a compelling story of *how* to use it
> a social protocal and a service API at once hints at *why* the user's purpose is fulfilled 
> an *archetypal* usage, not the only one

Bringing that back to the project, there are a lot of things about going through this process of development that are just unnecessarily painful. I feel that I'm not alone in feeling this way given that Jackkson's work is looking into how we can use AI models, like ChatGPT, to do the coding after the design decisions have been made and documented in the Concept spec.

While this is a potential solution to the synchronization and verbosity issues presented in the section [above](#a-concepts-state-and-actions-are-database-synchronizations), I personally think that there's a missed opportunity in using concepts to structure APIs (not only for web development but also for any program with a user-interface). 

> **innovations (almost) never enable new things**
>
> they just make them *easier* to do
> an old scenario with *pain* points is replaced by new one

The main idea comes from [the Protocal Buffers language](https://protobuf.dev/programming-guides/proto3/). It's not a programming language like Python or TypeScript, but rather a schema for structuring data and messages for remote procedure calls using binary encoding. This would be an extremely difficult thing to generate for every single project, so the language offers code generation where programmers may create a schema then [generate](https://protobuf.dev/programming-guides/proto3/#generating) the data classes in a variety of languages (but noteably not TS/JSNode).

By formalizing the semantics of the Concept specification, we can generate the structure of the application in such a way that the front-end dev gets the basic (in this case Vue) components of each data block and the back-end dev gets the database and transport methods. This allows for the front-end devs to focus on the user-facing implications of the design and the back-end devs to worry about the techinal design of the backend system, all while creating a schema that is more human readable and thereby accessible. Much like how the URL lowered the barrier-for-entry of the internet, having a formal spec that may be reasoned about by anyone (by any designer, user, or impacted persons).

This approach could be combined with the ChatGPT solution by inputting the output methods, normally to be coded by devs, into a model to populate. This is not necessarily the use-case I'm backing, but I want to note that it's still a viable solution. I personally think that this is an interesting future area of development.