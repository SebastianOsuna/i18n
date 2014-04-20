i18n
====

Internationalization and localization library for HTML pages via Javascript.

Supports nested resolving, i.e. you can use `I18N.resolve( 'a.b.c' )` to resolve 

``` 
"EN": {
    "a": {
        "b": {
            "c": "Your text"
        }
    }
}
```
or
```
"EN": { "a.b.c": "Your text" } 
```

### Requirements

- [jQuery]

### Usage

- Add a `<script>` element after your [jQuery] import with `id="i18n"`.
- Add a `i18n-src` attribute to the previous `<script>` tag pointing to you JSON locale file.
- Add a `i18n-locale` attribute to the previous `<script>` tag with the locale the page will use.
- Mark the elements that will use i18n with `i18n-text`.
- Or use `I18N.resolve` in your scripts.
- Use `I18N.setLocale(..)` to dynamically change the locale.

See the example for more details.

[jQuery]:http://jquery.com