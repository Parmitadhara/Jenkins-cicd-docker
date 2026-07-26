pipeline {
    agent any

    environment {
        // Updated to match your repository name
        IMAGE_NAME = "parmitadhara/jenkins-cicd-docker"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build Container') {
            steps {
                echo "Building Docker image ${IMAGE_NAME}:${BUILD_NUMBER}..."
                sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
            }
        }

        stage('Run Containerized Tests') {
            steps {
                echo "Running health check / tests..."
                sh "docker run --rm ${IMAGE_NAME}:${BUILD_NUMBER} npm test"
            }
        }

        stage('Push Image to Registry') {
            steps {
                // Ensure 'docker-hub-credentials' matches your Credential ID in Jenkins
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: 'https://index.docker.io/v1/']) {
                    echo "Pushing image to Docker Hub..."
                    sh "docker push ${IMAGE_NAME}:${BUILD_NUMBER}"
                }
            }
        }

        stage('Local Deployment') {
            steps {
                echo "Deploying application container locally..."
                // Stops existing container if running, then starts fresh container on port 3000
                sh "docker stop food-app-container || true"
                sh "docker rm food-app-container || true"
                sh "docker run -d --name food-app-container -p 3000:3000 ${IMAGE_NAME}:${BUILD_NUMBER}"
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully! App is running at http://localhost:3000"
        }
        failure {
            echo "Pipeline failed. Check build logs above for errors."
        }
    }
}
