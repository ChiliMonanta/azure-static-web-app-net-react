using System;
using System.Linq;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using System.Net;
using StaticWebApp.Api.Models;

namespace StaticWebApp.Api;

public static class WeatherForecastFunction
{
    private static string GetSummary(int temp)
    {
        var summary = "Mild";

        if (temp >= 32)
        {
            summary = "Hot";
        }
        else if (temp <= 16 && temp > 0)
        {
            summary = "Cold";
        }
        else if (temp <= 0)
        {
            summary = "Freezing";
        }

        return summary;
    }

    [Function("WeatherForecast")]
    public static HttpResponseData Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequestData req,
        ILogger log)
    {
        var randomNumber = new Random();
        var temp = 0;

        var result = Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = temp = randomNumber.Next(-20, 55),
            Summary = GetSummary(temp)
        }).ToArray();

        var response = req.CreateResponse(HttpStatusCode.OK);
        response.WriteAsJsonAsync(result);

        return response;
    }
}
