pipeline {
    agent any
    stages {
        stage('Set Build Name'){
            steps {
                script {
                    currentBuild.displayName = "#${params.Branch_Name.split("/")[2].toUpperCase()} - v${params.MAJOR}.${params.MINOR}.${BUILD_NUMBER}"
                }
            }
        }
        stage('Verify node version') {
            steps {
                sh 'node --version'
            }
        }
        stage('Verify npm version') {
            steps {
                sh 'npm --version'
            }
        }
        stage('Install Packages') {
            steps {
                sh 'npm i'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Clear Workspace') {
            steps {
                sh 'rm -r *'
                sh 'cd ..'
                sh 'cd piggy_ui_pre_deploy_check@script'
                sh 'rm -r *'
            }
        }
        stage('Complete') {
            steps {
                sh 'echo Completed'
            }
        }
    }
}