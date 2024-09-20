pipeline {
    agent any
    tools {nodejs "NODEJS"}
    stages {
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
        stage('List files') {
            steps {
                sh 'ls'
            }
        }
        stage('Install Packages') {
            steps {
                sh 'npm i smallest'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Complete') {
            steps {
                sh 'echo Completed'
            }
        }
    }
}