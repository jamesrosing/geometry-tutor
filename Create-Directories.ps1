# PowerShell Script to create Geometry Tutor directory structure
# Save this as Create-Directories.ps1

$ProjectPath = "D:\geometry-tutor"

# App directories
$Directories = @(
    "src\app\(auth)\login",
    "src\app\(auth)\register",
    "src\app\(dashboard)\progress",
    "src\app\(dashboard)\settings",
    "src\app\(dashboard)\modules\[moduleId]\lesson",
    "src\app\(dashboard)\modules\[moduleId]\demonstration",
    "src\app\(dashboard)\modules\[moduleId]\quiz",
    "src\app\(dashboard)\modules\[moduleId]\review",
    "src\components\ui",
    "src\components\modules",
    "src\components\layout",
    "src\components\shared",
    "src\lib",
    "src\hooks",
    "src\store",
    "public\images"
)

foreach ($dir in $Directories) {
    New-Item -ItemType Directory -Path "$ProjectPath\$dir" -Force
    Write-Host "Created $dir"
}

Write-Host "Directory structure created successfully!"
Write-Host "Next steps: Implement core files and components as outlined in the guides."