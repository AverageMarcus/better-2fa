# Better 2FA

> A proof of concept for a better 2FA code that replaces previously sent SMS messages

Better 2FA sends a random 4 digit code to the provided phone number. When the verify function is used it then sends another SMS message overwriting the original 4 digit code with "code used".

![](/Better2fa.gif)

## Related

* [sms-7bit-alphabet](https://github.com/AverageMarcus/sms-7bit-alphabet)

## Thanks

Thanks to [Sam Machin](https://twitter.com/sammachin) for telling me about this fascinating feature of SMS and his [example python application](https://github.com/nexmo-community/python-interesting-sms) covering some other interesting SMS features.
