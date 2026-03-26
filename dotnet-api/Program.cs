using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using RangaFlowers.API.Data;
using RangaFlowers.API.Services;
using RangaFlowers.API.Hubs;
using Microsoft.Extensions.Hosting;
using System;

// Bootstrapping the Application
var builder = WebApplication.CreateBuilder(args);

// 1. Register Controllers & SignalR (WebSockets)
builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 2. Register Database (MongoDB)
var mongoClient = new MongoDB.Driver.MongoClient(builder.Configuration.GetConnectionString("MongoDB") ?? "mongodb://localhost:27017");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMongoDB(mongoClient, builder.Configuration["DatabaseName"] ?? "RangaFlowersDb")); 

// 3. Dependency Injection: Register custom services
builder.Services.AddScoped<IEmailService, EmailService>();

// 4. Enable CORS for Angular Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials(); // Critical for SignalR
    });
});

var app = builder.Build();

// Configure HTTP pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AngularApp");
app.UseRouting();

// Authentication / Authorization Middleware 
// app.UseAuthentication();
// app.UseAuthorization();

app.MapControllers();
app.MapHub<RequestHub>("/hubs/requests"); // Endpoints Mapping

app.Run();
