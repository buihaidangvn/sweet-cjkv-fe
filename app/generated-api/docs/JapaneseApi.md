# JapaneseApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**searchWord**](#searchword) | **GET** /japanese/search-word/{word} | |
|[**suggestWord**](#suggestword) | **GET** /japanese/suggest/{word} | |

# **searchWord**
> JapaneseSearchWordResponseDto searchWord()


### Example

```typescript
import {
    JapaneseApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JapaneseApi(configuration);

let word: string; // (default to undefined)

const { status, data } = await apiInstance.searchWord(
    word
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **word** | [**string**] |  | defaults to undefined|


### Return type

**JapaneseSearchWordResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **suggestWord**
> Array<JapaneseSuggestWordResponseDto> suggestWord()


### Example

```typescript
import {
    JapaneseApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JapaneseApi(configuration);

let word: string; // (default to undefined)

const { status, data } = await apiInstance.suggestWord(
    word
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **word** | [**string**] |  | defaults to undefined|


### Return type

**Array<JapaneseSuggestWordResponseDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

