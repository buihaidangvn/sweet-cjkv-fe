# JapaneseSuggestWordApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**japaneseSuggestWordControllerSuggestWord**](#japanesesuggestwordcontrollersuggestword) | **GET** /japanese/suggest-word | |

# **japaneseSuggestWordControllerSuggestWord**
> Array<string> japaneseSuggestWordControllerSuggestWord()


### Example

```typescript
import {
    JapaneseSuggestWordApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JapaneseSuggestWordApi(configuration);

let word: string; // (default to undefined)

const { status, data } = await apiInstance.japaneseSuggestWordControllerSuggestWord(
    word
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **word** | [**string**] |  | defaults to undefined|


### Return type

**Array<string>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

