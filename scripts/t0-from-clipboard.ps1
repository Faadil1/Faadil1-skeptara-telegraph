$ErrorActionPreference = "Stop"

Write-Host "Skeptara T0 secure local launcher"
Write-Host "1. Leave this PowerShell window open."
Write-Host "2. NOW switch to your burner wallet and copy ONLY the exported EVM private key."
Write-Host "3. Return here and press ENTER. Do not paste the key into PowerShell."
Read-Host "Press ENTER after the burner private key is in the clipboard" | Out-Null

$raw = [string](Get-Clipboard -Raw)
$pk = $raw.Trim()

if ($pk.Length -ge 2) {
    if (($pk.StartsWith('"') -and $pk.EndsWith('"')) -or ($pk.StartsWith("'") -and $pk.EndsWith("'"))) {
        $pk = $pk.Substring(1, $pk.Length - 2).Trim()
    }
}

if ($pk -match '^[0-9a-fA-F]{64}$') {
    $pk = "0x$pk"
}

if ($pk -notmatch '^0x[0-9a-fA-F]{64}$') {
    Write-Host "INVALID private-key format" -ForegroundColor Red
    Write-Host "Observed trimmed length: $($pk.Length)"
    Write-Host "Expected: 64 hex characters, or 66 including 0x."
    Write-Host "Do not use a wallet address, password, recovery phrase, keystore JSON, or copied command block."
    Set-Clipboard -Value "Skeptara clipboard cleared"
    $pk = $null
    $raw = $null
    exit 3
}

Write-Host "VALID EVM private-key format. Launching T0 without printing the key." -ForegroundColor Green

$exitCode = 1
try {
    $env:TELEGRAPH_EVM_PRIVATE_KEY = $pk
    Set-Clipboard -Value "Skeptara clipboard cleared"
    npm run t0
    $exitCode = $LASTEXITCODE
}
finally {
    Remove-Item Env:TELEGRAPH_EVM_PRIVATE_KEY -ErrorAction SilentlyContinue
    $pk = $null
    $raw = $null
}

exit $exitCode
