# Flow Property: AreMetricsLoggedToDataCloud

## What it is

This is a boolean property (true/false flag) for a Flow in Salesforce.

## Purpose

It controls whether Flow runtime metrics (like usage, performance,
errors, run counts, etc.) are sent and logged into Salesforce Data Cloud
for analytics and tracking.

## Default Behavior

-   **Default = false** → meaning that by default, a flow does not log
    its metrics to Data Cloud.\
-   You would have to explicitly enable it (`true`) if you want those
    metrics tracked.

## Availability

-   This property was introduced starting with **API version 63.0
    (Winter '25 release)**.\
-   If your flow metadata is set to an **older API version (≤62.0)** and
    it contains this property, you'll get a deployment error (like the
    one you saw earlier).

## Properties you mentioned

-   **Defaulted on create** → When a flow is created, the property
    automatically defaults to `false`.\
-   **Filter, Group, Sort** → Means this field can be used in list
    views, queries, and filtering within Salesforce metadata context.\
-   **Type: Boolean** → Only `true` or `false`.

## Practical Example

Imagine you have a flow called **"Update UCC Related Info"**.

-   If `AreMetricsLoggedToDataCloud = true`, then every time this flow
    runs, Salesforce logs usage data into Data Cloud (like execution
    time, number of runs, etc.), which can later be used in analytics
    dashboards.\
-   If `false` (default), those metrics stay local and aren't pushed to
    Data Cloud.

------------------------------------------------------------------------

⚠️ **Why you got the error in your pipeline**\
You tried deploying a flow with this property
(`AreMetricsLoggedToDataCloud`) into an org on **API version 62.0**,
where this field isn't recognized yet → so Salesforce flagged it as
invalid.

------------------------------------------------------------------------

👉 Do you want me to also show you **how to fix this error** during
deployment (by either removing this property or upgrading your flow's
API version)?
