---
title: HTTP Status Codes (And Why We Should Use Them)
layout: doc
---

# HTTP Status Codes (And Why We Should Use Them)

In the TA Review Session, a question came up regarding error-handling: why use error codes?

The question was posed when discussing how to properly throw exceptions. Looking in `{Project Root}/server/concepts/errors.ts` we have the following error classes defined:

<code>
    export class NotAllowedError extends FormattableError {
        
        public static readonly HTTP_CODE = 403;
    }
</code>
<code>
    export class NotFoundError extends FormattableError {
        
        public static readonly HTTP_CODE = 404;
    }
</code>

These classes are meant to be extended, as shown in `{Project Root}/server/concepts/friending.ts`:

<code>
    export class AlreadyFriendsError extends NotAllowedError {
        
        constructor(
            public readonly user1: ObjectId,
            public readonly user2: ObjectId,
        ) {
            super("{0} and {1} are already friends!", user1, user2);
        }
    }
</code>

When `AlreadyFriendsError` is thrown (as would be the case when searching for a friendship that doesn't exist), the error code `403`, and an appropriate message, will be provided in the response.

But why go through the trouble of all of this extra code when `return {msg: "Very Important Error Made"}` can, admittedly (and don't let them convince you otherwise!), accomplish the same thing?

## A Concise Intro to HTTP Response Status Codes

Note: The information below was compiled from [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status). This page is great to refer to when working with response codes.

The main goal of using HTTP response status codes is to provide context to the requester regarding their request. These codes are passed as part of the header of a response from a server. There are 5 classes of HTTP response status codes:
- Informational responses (`100` - `199`)
- Successful responses (`200` - `299`)
- Redirection messages (`300` - `399`)
- Client error responses (`400` - `499`)
- Server error responses (`500` - `599`)

***Note:** not all response status codes are errors, and that even successful responses have multiple options for "success".*

Some of the error codes might be familiar, like the `404` (Not Found) error page commonly hit when attempting to find a page that doesn't exist, as [here](https://github.com/MPadilla198/portfolio-miguel-), or the `429` (Too Many Requests), or the `502` (Bad Gateway).

The `200` (OK) is probably the most commonly used success code, as it just means the method requested was performed on the resource without issue. But, there exists more expressive options than just a standard "success", such as responding with a `201` (Created) when `POST`ing or `PUT`ting a new resource or a `202` (Accepted) when processing the request right away on the server is not an option.

Keep in mind that many internet protocols were designed to connect machines with limited memory (as was the case in the early days of networked computing). Maybe it doesn't seem like much now, but parsing strings was expensive compared to integer comparisons (they still are more computationally expensive, even now, but most people don't care with how fast computers have become).

## So, Why Use Response Status Codes? 
### (Beyond Just Because It's Convention)

Truthfully, (and I would anticipate that the professors would disagree with this statement) we don't have to use them: You could respond to every single request received by the server with a [418](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418) just because you feel like it. It's not going to impact the core funtionalilty of your app. 

In the same way that a `<div>` may be used instead of a `<section>` or `<main>` or `<article>`, the `200` lacks the context given by, say, a `204` (No Content) when a `PATCH` request is made.

(**Disclaimer** the statement above is only true when you control both the front- and back-end, i.e. your front-end app is the only application utilizing the API. Were other applications to depend on your API, it's best to stick to convention to make it easy for others to successfully communicate with your server.)

Here's how you could go about doing it:

<code>
    export class AllErrors extends FormattableError {

        public static readonly HTTP_CODE = 418;
        constructor(
            public readonly msg: string,
        ) {
            super("An Error Occured: {0}", msg);
        }
    }
</code>

However, doing so would deprive your app from the context concerning the state of the server. Consider the scenario when the server may be responding to requests but is unable to access memory at the moment (so any `POST` made would never actually make it to main memory). Not having context would mean that your app would be unaware and continue to `POST` (consequently, losing all the posts you attempt to make).

Within a context-aware response, a `500` (Internal Server Error) may be sent back (although this should be a "code of last resort" within the `5xx` class), but more likely a `503` (Service Unavailable) with the field `Retry-After` present in the header and an estimated time for when to try again. We could possibly even respond with a `507` (Insuficient Storage), letting the request know that they may not be able to make this call successfully, indefinitely.

Now you may be thinking to yourself, I could keep the `AllErrors` implementation from above and just use a specific error message, say `throw new AllErrors("Out of Memory. Do Not Respond.")`, and now the requester knows the state of the server. Again, you wouldn't be wrong, but now your frontend is parsing specific error strings to understand state rather than accepting readily-available, appropriate, compact response codes.

Also, considering that this is a class, it would be best (not only for your own learning but also for your grade, apparently) to practice using standard convention when designing your APIs.

## Making Up Your Own Status Codes

[Here](https://httpwg.org/specs/rfc9110.html#overview.of.status.codes) you may find the specs for HTTP response codes. Any response code that you may come across that is not listed here is typically a "non-standard" HTTP status code designation, including any that you may make for, and deploy within, your own server APIs!

As with most things, HTTP response status codes have as much meaning as we given them: the more we push to respond with correct and meaningful response codes, the more generally useful they become.
