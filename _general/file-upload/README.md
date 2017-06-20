# File Upload

## Files api

Sending files via html/js can be done using the file api.
### JavaScript example

```html
<input type="file" id="it" name="files" multiple="multiple" accept="image/*" />
```

```javascript
$.each($('input#it').files, function (file) {
    postNewAsset(file)
        .progress(function (progress) {
            console.log('Progress ' + progress);
        })
        .then(function () {
            alert('File uploaded!!!!');
        });
});

function postNewAsset (file) {
    var form_data = new FormData(),
        $deferred = new $.Deferred(),
        request;

    form_data.append('file', file);

    request = new XMLHttpRequest();

    request.upload.addEventListener('progress', function(e) {
        $deferred.notify((e.loaded / e.total) * 100 + '%');
    }, false);

    request.open('POST', 'http://example.com/upload');

    request.setRequestHeader('Accept', '*/*');

    request.onreadystatechange = function () {
        if (request.readyState !== 4) {
            return;
        }
        if ([200, 304].indexOf(request.status) === -1) {
            $deferred.reject(request.status);
        } else {
            $deferred.resolve(JSON.parse(request.response).message);
        }
    };

    request.send(form_data);

    return $deferred.promise();
}
```



## Multipart

Multipart form data is used to send form data. It can be used to send files.

### Sending multipart data to the server

* Data must be sent with a `Content-Type: multipart/form-data, boundary=--MY_UNIQUE_BOUNDARY--` header
* The boundary is used to separate fields in the form. Example:

```text
----MY_UNIQUE_BOUNDARY--
Content-Disposition: form-data; name="field1"

field value here
----MY_UNIQUE_BOUNDARY--
Content-Disposition: attachment; name="file1"; filename="my_file.jpg"
Content-Type: image/jpeg
Content-Transfer-Encoding: base64

874fbiu45fguh4uyb45b8uyb45uyb43fyutgrvub4yutgvbybrvuyuyfbuierhg4eiguqiubiuw4bgiu4b8b45g4g...
----MY_UNIQUE_BOUNDARY----
```

* Notes
    * boundaries in the post body must be prefixed with two hyphens (`--`)
    * the final boundary must have another two hyphens appended to it
    * lines must be terminated with a carriage-return followed by a line-break (`\r\n`)
    * Content-Encoding may be `base64` or `binary` (other encodings might be allowed as well)

#### C# example

```csharp
public async Task<CurrentUser> SetAvatar (byte[] imageBytes)
{
    var headerBoundary = "--" + Guid.NewGuid().ToString();
    var boundary = "--" + headerBoundary;
    var sb = new StringBuilder ();

    sb.Append(boundary + "\r\n");
    sb.AppendFormat ("Content-Disposition: attachment; name=\"{0}\"; filename=\"{1}\"\r\n", "file", "avatar.jpg");
    sb.Append ("Content-Type: image/jpeg\r\n");
    sb.Append ("Content-Transfer-Encoding: base64\r\n\r\n");
    sb.Append (Convert.ToBase64String (imageBytes, 0, imageBytes.Length) + "\r\n");
    sb.AppendLine (boundary + "--\r\n");

    var postBody = new StringContent (sb.ToString());
    postBody.Headers.Remove ("Content-Type");
    postBody.Headers.TryAddWithoutValidation ("Content-Type", "multipart/form-data; boundary=" + headerBoundary);

    UpdateFromUser(await Request.GetInstance ().Post<User, StringContent> ("/user/avatar", postBody));

    return this;
}
```

Note the double quotes for the name and filename values. If you are receiving the data with the multiparty npm, then
currently this is needed. This will probably get fixed with [issue 101](https://github.com/andrewrk/node-multiparty/issues/101).

```
name=\"{0}\";
```
