# Get account details for specified users
param(
    [string[]]$UserNames = @("hmartinez", "ilya")
)

foreach ($user in $UserNames) {
    Write-Host "`n=== Account Details for: $user ===" -ForegroundColor Cyan
    
    try {
        $adUser = Get-ADUser -Identity $user -Properties *
        
        Write-Host "Name: $($adUser.Name)"
        Write-Host "SamAccountName: $($adUser.SamAccountName)"
        Write-Host "Email: $($adUser.Mail)"
        Write-Host "Title: $($adUser.Title)"
        Write-Host "Department: $($adUser.Department)"
        Write-Host "Manager: $($adUser.Manager)"
        Write-Host "Created: $($adUser.Created)"
        Write-Host "Last Logon: $($adUser.LastLogonDate)"
        Write-Host "Account Enabled: $($adUser.Enabled)"
        Write-Host "Phone: $($adUser.telephoneNumber)"
        Write-Host "Office: $($adUser.Office)"
    }
    catch {
        Write-Host "Error retrieving details for $user : $_" -ForegroundColor Red
    }
}
