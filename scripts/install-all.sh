#!/bin/bash

yarn install --cwd ../src/Clients/SPA/open-data-client &
dotnet restore ../src/OpenData.sln &