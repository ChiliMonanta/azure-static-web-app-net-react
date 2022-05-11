using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Azure.Functions.Worker;
using System.Net;
using System.Text.Json;
using System;

namespace StaticWebApp.Api;

public class HttpTrigger
{
    private readonly ILogger<HttpTrigger> log;

    public HttpTrigger(ILoggerFactory loggerFactory)
    {
        log = loggerFactory.CreateLogger<HttpTrigger>();
    }

    [Function("HttpTrigger1")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = "trigger")] HttpRequestData req)
    {
        log.LogInformation("C# HTTP trigger function processed a request.");

        var query = System.Web.HttpUtility.ParseQueryString(req.Url.Query);
        var name = query["name"];

        var requestBody = await new StreamReader(req.Body).ReadToEndAsync();
        log.LogInformation($"-->> {requestBody}");
        if (!string.IsNullOrEmpty(requestBody))
        {
            dynamic data = JsonSerializer.Deserialize<dynamic>(requestBody);
            name = name ?? data?.name;
        }

        string responseMessage = string.IsNullOrEmpty(name)
            ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
            : $"Hello, {name}. This HTTP triggered function executed successfully.";


        var response = req.CreateResponse(HttpStatusCode.OK);
        response.WriteString(responseMessage);

        return response;
    }

    [Function("HttpTrigger2")]
    public async Task<HttpResponseData> EnvTest(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "trigger2")] HttpRequestData req)
    {
        log.LogInformation("C# HTTP trigger function processed a request.");

        var settings = Environment.GetEnvironmentVariable("MY_SETTINGS");
        var response = req.CreateResponse(HttpStatusCode.OK);
        response.WriteString(settings);

        return response;
    }
}