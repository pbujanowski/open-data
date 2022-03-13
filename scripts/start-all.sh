#!/bin/bash

yarn --cwd ../src/Clients/SPA/open-data-client start &
dotnet run --project ../src/Gateways/Web/OpenData.Gateways.Web &
dotnet run --project ../src/Services/NationalBank/OpenData.Services.NationalBank.API &