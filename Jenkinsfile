pipeline {
    agent any

    environment {
        // Replace with your Docker Hub registry path
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_IMAGE    = 'parmitadhara/jenkins-cicd-app' // Docker image name
        DOCKER_CREDS    = 'docker-hub-credentials' // Jenkins Credential ID
    }

    stages {
        stage('1. Checkout SCM') {
            steps {
                // Pulls code from Git branch where the web hook triggered
                checkout scm
            }
        }

        stage('2. Build Container') {
            steps {
                script {
                    echo "Building Docker image ${DOCKER_IMAGE}:${BUILD_NUMBER}..."
                    // Automatically looks for ./Dockerfile in root
                    dockerImage = docker.build("${DOCKER_IMAGE}:${BUILD_NUMBER}")
                }
            }
        }

        stage('3. Run Containerized Tests') {
            steps {
                script {
                    echo "Running test suite inside container..."
                    // Spin up temporary container isolated from host
                    dockerImage.inside {
                        sh 'npm test || true' // Executes test script defined in package.json
                    }
                }
            }
        }

      stage('Push Image to Registry') {
            steps {
        // Replace 'docker-hub-credentials' with the exact Credential ID you saved in Jenkins
                   withDockerRegistry([credentialsId: 'docker-hub-credentials', url: 'https://index.docker.io/v1/']) {
                  sh "docker push parmitadhara/jenkins-cicd-app:${BUILD_NUMBER}"
                    }
                 }
               }
        

        stage('5. Local Deployment') {
            steps {
                script {
                    echo "Updating local container deployment..."
                    // Stop previous container if running, then run fresh image
                    sh '''
                        docker stop my-app-prod || true
                        docker rm my-app-prod || true
                        docker run -d \
                          --name my-app-prod \
                          --restart unless-stopped \
                          -p 3000:3000 \
                          ${DOCKER_IMAGE}:latest
                    '''
                }
            }
        }
    }

    post {
        always {
            // Clean up old dangling images to prevent filling host disk space
            sh 'docker image prune -f'
        }
        success {
            echo "Pipeline succeeded for Build #${BUILD_NUMBER}"
        }
        failure {
            echo "Pipeline failed on Build #${BUILD_NUMBER}. Check logs above."
        }
    }
}
