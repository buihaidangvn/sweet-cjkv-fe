# JapaneseSearchWordCommentApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**japaneseSearchWordCommentControllerSearchWordComment**](#japanesesearchwordcommentcontrollersearchwordcomment) | **GET** /japanese/search-word-comment | |

# **japaneseSearchWordCommentControllerSearchWordComment**
> japaneseSearchWordCommentControllerSearchWordComment()


### Example

```typescript
import {
    JapaneseSearchWordCommentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JapaneseSearchWordCommentApi(configuration);

let word: string; // (default to undefined)
let id: number; // (default to undefined)
let cleanFormat: boolean; // (default to undefined)

const { status, data } = await apiInstance.japaneseSearchWordCommentControllerSearchWordComment(
    word,
    id,
    cleanFormat
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **word** | [**string**] |  | defaults to undefined|
| **id** | [**number**] |  | defaults to undefined|
| **cleanFormat** | [**boolean**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

