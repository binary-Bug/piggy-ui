pipeline {
    agent any
    stages {
        stage('Set Build Name'){
            steps {
                script {
                    currentBuild.displayName = "#${params.Branch_Name} - v0.${BUILD_NUMBER}" 
                }
            }
        }
        stage('Verify node version') {
            steps {
                powershell '''$x="ai-somename-someid"
                            $y=$x.split("-")[1]'''
            }
        }
        // stage('Verify node version') {
        //     steps {
        //         sh 'node --version'
        //     }
        // }
        // stage('Verify npm version') {
        //     steps {
        //         sh 'npm --version'
        //     }
        // }
        // stage('Install Packages') {
        //     steps {
        //         sh 'npm i'
        //     }
        // }
        // stage('Build') {
        //     steps {
        //         sh 'npm run build'
        //     }
        // }
        stage('Clear Workspace') {
            steps {
                sh 'sudo rm -r *'
            }
        }
        stage('Complete') {
            steps {
                sh 'echo Completed'
            }
        }
    }
}