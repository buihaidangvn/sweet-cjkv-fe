# JapaneseSearchWordApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**japaneseSearchWordControllerSearchWord**](#japanesesearchwordcontrollersearchword) | **GET** /japanese/search-word | |

# **japaneseSearchWordControllerSearchWord**
> JapaneseSearchWordControllerSearchWord200Response japaneseSearchWordControllerSearchWord()


### Example

```typescript
import {
    JapaneseSearchWordApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JapaneseSearchWordApi(configuration);

let word: string; // (default to undefined)
let cleanFormat: boolean; // (optional) (default to undefined)
let withComment: boolean; // (optional) (default to undefined)

const { status, data } = await apiInstance.japaneseSearchWordControllerSearchWord(
    word,
    cleanFormat,
    withComment
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **word** | [**string**] |  | defaults to undefined|
| **cleanFormat** | [**boolean**] |  | (optional) defaults to undefined|
| **withComment** | [**boolean**] |  | (optional) defaults to undefined|


### Return type

**JapaneseSearchWordControllerSearchWord200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**404** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

