$ErrorActionPreference = 'Stop'

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Error 'Node.js and npm are required. Install the current Node.js LTS release, then try again.'
  exit 1
}

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendPath = Join-Path $projectRoot 'backend'
$frontendPath = Join-Path $projectRoot 'frontend'

Start-Process -FilePath 'powershell.exe' -WorkingDirectory $backendPath -ArgumentList @(
  '-NoExit',
  '-ExecutionPolicy', 'Bypass',
  '-Command', "Set-Location -LiteralPath `"$backendPath`"; npm run dev"
)

Start-Process -FilePath 'powershell.exe' -WorkingDirectory $frontendPath -ArgumentList @(
  '-NoExit',
  '-ExecutionPolicy', 'Bypass',
  '-Command', "Set-Location -LiteralPath `"$frontendPath`"; npm run dev -- --host=127.0.0.1"
)

$ready = $false
for ($attempt = 0; $attempt -lt 30; $attempt++) {
  try {
    $health = Invoke-RestMethod 'http://localhost:3001/api/health' -TimeoutSec 2
    $frontend = Invoke-WebRequest 'http://localhost:5173/' -UseBasicParsing -TimeoutSec 2
    if ($health.status -eq 'ok' -and $frontend.StatusCode -eq 200) {
      $ready = $true
      break
    }
  } catch {
    Start-Sleep -Seconds 1
  }
}

if (-not $ready) {
  Write-Error 'SalesAI did not start. Check the backend and frontend PowerShell windows for errors.'
  exit 1
}

Start-Process 'http://localhost:5173'
Write-Host 'SalesAI is running at http://localhost:5173'
Write-Host 'Keep both SalesAI PowerShell windows open while using the local app.'
