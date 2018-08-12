FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY Kark/Kark.csproj Kark/
RUN dotnet restore Kark/Kark.csproj
COPY . .
WORKDIR /src/Kark
RUN dotnet build Kark.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish Kark.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Kark.dll"]
