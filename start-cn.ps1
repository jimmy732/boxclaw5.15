$ErrorActionPreference = 'Stop'

$siteRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$bundledNode = 'C:\Users\ADMINHT\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue

if ($nodeCommand) {
  $nodeExecutable = $nodeCommand.Source
} elseif (Test-Path -LiteralPath $bundledNode) {
  $nodeExecutable = $bundledNode
} else {
  throw '未找到 Node.js。请先安装 Node.js 20 或更高版本。'
}

$env:FBOX_PORT = '4188'
$env:FBOX_RUNTIME_DIR = Join-Path $siteRoot 'work\runtime-cn'
Set-Location -LiteralPath $siteRoot
& $nodeExecutable 'server.mjs'
