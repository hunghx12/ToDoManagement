# Use the official .NET 8 SDK image as a build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set working directory
WORKDIR /src

# Copy the project file and restore dependencies
COPY ToDoApi.csproj ./
RUN dotnet restore

# Copy the remaining files and build the project
COPY . .
RUN dotnet publish -c Release -o /app/publish

# Use the official ASP.NET Core runtime image for running the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0

# Set working directory
WORKDIR /app

# Copy the published app from the build stage
COPY --from=build /app/publish .

# Expose port 80
EXPOSE 80
ENV ASPNETCORE_HTTP_PORTS 80

# Start the app
ENTRYPOINT ["dotnet", "ToDoApi.dll"]
