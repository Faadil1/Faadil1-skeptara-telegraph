$ErrorActionPreference = "Stop"

Write-Host "Skeptara T0 secure local launcher"
Write-Host "1. Keep this PowerShell window open."
Write-Host "2. Switch to the burner wallet and copy ONLY the exported EVM private key."
Write-Host "3. Do NOT type or paste the key into PowerShell."
Write-Host "4. This helper will detect a valid key in the clipboard automatically for up to 90 seconds."
Write-Host ""
Write-Host "Waiting for a valid EVM private key in the clipboard..." -ForegroundColor Yellow

$raw = $null
$pk = $null
$deadline = (Get-Date).AddSeconds(90)

while ((Get-Date) -lt $deadline) {
    try {
        $candidateRaw = [string](Get-Clipboard -Raw)
        $candidate = $candidateRaw.Trim()

        if ($candidate.Length -ge 2) {
            if (($candidate.StartsWith('"') -and $candidate.EndsWith('"')) -or ($candidate.StartsWith("'") -and $candidate.EndsWith("'"))) {
                $candidate = $candidate.Substring(1, $candidate.Length - 2).Trim()
            }
        }

        if ($candidate -match '^[0-9a-fA-F]{64}$') {
            $candidate = "0x$candidate"
        }

        if ($candidate -match '^0x[0-9a-fA-F]{64}$') {
            $raw = $candidateRaw
            $pk = $candidate
            break
        }
    }
    catch {
        # Clipboard may be temporarily unavailable while another app owns it.
    }

    Start-Sleep -Milliseconds 500
}

if (-not $pk) {
    Write-Host "No valid EVM private key was detected in the clipboard within 90 seconds." -ForegroundColor Red
    Write-Host "Restart the helper and copy the burner account private key after the waiting message appears."
    exit 3
}

Write-Host "VALID EVM private-key format detected. Launching T0 without printing the key." -ForegroundColor Green

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
    $candidate = $null
    $candidateRaw = $null
}

exit $exitCode
