#!groovy

@Library("ma-pipeline-libs") _

import com.ma.MaDocker

node {
    deleteDir()

    def container = "eu.gcr.io/ma-dev2/jenkins/node:latest"


    def builtImage

    stage("GitHub") {
        def scmVars = checkout scm
    }

    try {
        withCredentials([
            string(credentialsId: 'packagecloud-read-npm-token', variable: 'PACKAGECLOUD_NPM_TOKEN')
        ]) {
            docker.image(container).inside("--entrypoint=''") {
                stage('Init') {
                      sh '''
                      # Configure your test steps here (checkout, npm install, tests etc)
                      npm install
                      '''
                }
                stage('Release') {
                    environment {
                        GH_TOKEN = credentials('ma-jenkins-token')
                    }
                      sh '''
                      # Run optional required steps before releasing
                      npx semantic-release
                      '''
                }
            }
        }

    } catch (error) {
        throw error
    } finally {
        if (builtImage) {
            builtImage.rm()
        }
    }

    deleteDir()
}
