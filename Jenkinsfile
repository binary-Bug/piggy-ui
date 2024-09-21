pipeline {
    agent any
    stages {
        stage('Set Build Name'){
            steps {
                script {
                    currentBuild.displayName = "#${params.Branch_Name.split("/")[2].toUpperCase()}-v0.${BUILD_NUMBER}"
                }
            }
        }
        // stage('Verify node version') {
        //     steps {
        //         sh '#!/bin/bash
        //         IN="bla@some.com;john@home.com"
        //             arrIN=(${IN//;/ })
        //             ' > sc.sh
        //         sh ./scriptname.sh
        //     }
        // }
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