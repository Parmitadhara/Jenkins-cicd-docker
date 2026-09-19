##FeastFlow: Automated Food Delivery Platform

FeastFlow is a modern food delivery web application built with an automated delivery pipeline behind the scenes.

Think of this project like an automated kitchen and delivery fleet: when a developer makes updates to the food menu or website, the system automatically packages everything into standardized boxes (containers), runs safety and quality checks, and sends them directly to the live website without manual setup.

##What Does This Project Do?
For Customers: Provides an easy-to-use food ordering website where users can explore dishes, filter by dietary preferences, select their city, and browse menus.

For Developers & Engineers: Removes the tedious task of manually updating and configuring servers. Every code change is verified, tested, and published automatically.

##How It Works (In Simple Terms)

```text
┌────────────────────────────────┐
│     Developer Writes Code      │
└───────────────┬────────────────┘
                │
                ▼
┌────────────────────────────────┐
│  GitHub: The Digital Notebook  │ ── Saves every version of the project
└───────────────┬────────────────┘
                │
                ▼
┌────────────────────────────────┐
│ Jenkins: The Automation Robot  │ ── Detects updates & runs checks
└───────────────┬────────────────┘
                │
                ▼
┌────────────────────────────────┐
│  Docker: The StandardizedBox   │ ── Packages app & ingredients together
└───────────────┬────────────────┘
                │
                ▼
┌────────────────────────────────┐
│   Docker Hub: The Warehouse    │ ── Stores ready-to-ship packages
└───────────────┬────────────────┘
                │
                ▼
┌────────────────────────────────┐
│  Live Server: The Restaurant   │ ── Serves the app to users 24/7
└────────────────────────────────┘
```



```text
+-------------------------------------------------------------------+
|                        1. Source Control                          |
|                                                                   |
|   +---------------------+               +---------------------+   |
|   |      Developer      | -- git push-> |  GitHub Repository  |   |
|   +---------------------+               +----------+----------+   |
+----------------------------------------------------|--------------+
                                                     | Trigger
                                                     v
+-------------------------------------------------------------------+
|                     2. Jenkins CI/CD Pipeline                     |
|                                                                   |
|   [Stage 1: Checkout]  --> Clone repository from GitHub           |
|            │                                                      |
|            ▼                                                      |
|   [Stage 2: Build]     --> Build Docker image (Tag: BUILD_NUMBER) |
|            │                                                      |
|            ▼                                                      |
|   [Stage 3: Test]      --> Run automated checks (npm test)        |
|            │                                                      |
|            ▼                                                      |
|   [Stage 4: Push]      --> Authenticate & push to Docker Hub      |
+----------------------------------------------------|--------------+
                                                     |
                                                     | docker push
                                                     v
+-------------------------------------------------------------------+
|                     3. Artifact Registry                          |
|                                                                   |
|   +-----------------------------------------------------------+   |
|   |                  Docker Hub Repository                    |   |
|   +-----------------------------+-----------------------------+   |
+---------------------------------|---------------------------------+
                                  |
                                  | docker pull
                                  v
+-------------------------------------------------------------------+
|                     4. Production Environment                     |
|                                                                   |
|   +-----------------------------------------------------------+   |
|   |                    Remote Linux Server                    |   |
|   |                                                           |   |
|   |    Docker Engine                                          |   |
|   |      └── FeastFlow Container (Active on Port 3000)        |   |
|   +-----------------------------+-----------------------------+   |
+---------------------------------|---------------------------------+
                                  |
                                  | Serves Web Traffic
                                  v
+-------------------------------------------------------------------+
|                     5. End User / Web Browser                     |
+-------------------------------------------------------------------+
```
##Sequence Flow:

Code Commit: The developer pushes verified code changes to the GitHub repository.

Pipeline Trigger: Jenkins detects updates and initiates the declarative pipeline.

Build & Verify: Jenkins checks out the repository, creates a versioned Docker image (BUILD_NUMBER), and executes automated testing (npm test).

Publish: The validated Docker image is authenticated and pushed to the Docker Hub registry.

Deployment: The target Linux host pulls the new image via Docker Engine and launches the updated FeastFlow container on port 3000.

Delivery: The web client loads the live application directly from the host server.

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""                        
GitHub: Acts as a secure digital notebook holding the project's source code and tracking every edit.

Jenkins: An automated assistant that starts working whenever new code is saved. It grabs the code, runs automated tests, and makes sure nothing is broken.

Docker: Packages the application and all necessary software into a single lightweight unit called a "container." This guarantees the app runs smoothly anywhere, regardless of machine setup.

Docker Hub: An online central warehouse where packaged application containers are stored securely.

Linux Cloud Server: The host running the container so anyone with an internet connection can visit the live website.

Key Benefits
No Human Error: Automating tests and deployment steps reduces manual mistakes.

Rapid Updates: New features reach users in minutes rather than hours.

Consistent Quality: Automatic quality checks verify the app before it ever goes live.

High Reliability: Standardized packaging ensures that the app behaves identically in development and on the production server.

Technologies Used
Node.js & Express: Powers the web application and core ordering logic.

Git & GitHub: Version tracking and code storage.

Jenkins: Automation engine driving the continuous delivery pipeline.

Docker & Docker Hub: Application packaging and centralized image storage.

Linux: Operating system powering the hosting environment.
##How the entire FeastFlow automated pipeline works, using the journey of a single update. 

Step 1: The Developer Writes and Pushes Code
What happens: When an engineer adds a new feature (like a new restaurant filter or a button) to the project, they save the code on their local machine. 
The Action: The developer uses the command git push origin main to upload the fresh code to GitHub.  
Real-world analogy: Writing a new recipe card and dropping it into the team’s central recipe binder.
Step 2: Jenkins Takes OverWhat happens: The push to GitHub notifies the Jenkins Server.
Jenkins acts as an automated project manager that works 24/7 without needing manual button clicks.  
The Action: Jenkins wakes up immediately and kicks off the automated sequence (called a pipeline).
Real-world analogy: An automated kitchen manager noticing a new recipe in the binder and immediately assembling the assembly line.
Step 3: Inside the Pipeline (The 4 Stages)Once Jenkins takes the job, it carries out four sequential tasks:  

Stage 1: Git Checkout  : Jenkins pulls down a clean copy of the newest code from the GitHub repository into its workspace.  
Stage 2: Build Container  : Jenkins packages the application into a Docker image. A Docker image bundles the web code, libraries, and runtime together into one self-contained package. It labels this package with a unique number (BUILD_NUMBER) so every release can be tracked. 
Stage 3: Run Tests (npm test)  : Before sending the package to the live world, Jenkins runs automated health and quality checks inside an isolated container. If any test fails, the process stops right here to prevent broken code from reaching users. 
Stage 4: Push to Registry  : Once the tests pass with flying colors, Jenkins logs into Docker Hub (the digital warehouse) and securely uploads the verified Docker image. 

Step 4: Storing in Docker HubWhat happens: Docker Hub holds all the finished, packaged versions of FeastFlow. 
The Action: It acts as a safe, centralized storage depot accessible by the live production server whenever an update needs to be retrieved. 
Real-world analogy: A central distribution warehouse holding ready-to-ship meal kits.
Step 5: Deploying to the Live ServerWhat happens: The remote Linux Server (the computer connected to the internet) connects to Docker Hub. 
The Action:The server pulls down the latest container image from Docker Hub.  
Its local Docker Engine starts the updated FeastFlow Application Container, running the service on port 3000.   Old containers are swapped out cleanly with zero service interruptions.  
Step 6: The End User Sees the ResultWhat happens: Anyone opening their web browser (Chrome, Safari, mobile browser) can immediately load the live website. 
The Action: The user orders their food through the updated website, benefiting from the latest fixes and features delivered entirely through automation.  
