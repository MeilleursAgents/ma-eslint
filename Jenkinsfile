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
            string(credentialsId: 'ma-jenkins-token', variable: 'GH_TOKEN'),
            string(credentialsId: 'packagecloud-read-npm-token', variable: 'PACKAGECLOUD_NPM_TOKEN')
        ]) {
            docker.image(container).inside("--entrypoint=''") {
                stage('Init') {
                    steps {
                        sh '''
                        # Configure your test steps here (checkout, npm install, tests etc)
                        npm install
                        '''
                        }
                }
                stage('Release') {
                    steps {
                        sh '''
                        # Run optional required steps before releasing
                        npx semantic-release
                        '''
                    }
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
