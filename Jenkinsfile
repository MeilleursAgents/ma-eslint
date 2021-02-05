#!groovy

@Library("ma-pipeline-libs") _

import com.ma.MaDocker

node {
    deleteDir()

    def container = "eu.gcr.io/ma-dev2/jenkins/node:latest"
    if (config.docker_build_image) {
        container = config.docker_build_image
    }


    def builtImage

    stage("GitHub") {
        def scmVars = checkout scm

        output['appName'] = config.app_name
        output['author'] = sh(returnStdout: true, script: "git show -s --format='%an' ${scmVars.GIT_COMMIT}").trim()
        output['description'] = sh(returnStdout: true, script: "git show -s --format='%B' ${scmVars.GIT_COMMIT}").trim()
        output['commit'] = "${scmVars.GIT_COMMIT}".substring(0,8)

        print("Last commit comes from ${output.author} #${output.commit}: ${output.description}")

        // Mecanism for detecting if build is master that works with multi-apps repos.
        String hashMaster = sh returnStdout: true, script: "git rev-parse -q --verify origin/main || git rev-parse -q --verify origin/master || echo 'NOT_FOUND'".trim()
        String hashHead = sh returnStdout: true, script: "git rev-parse --verify HEAD".trim()

        isMaster = hashMaster == hashHead
        output['isMaster'] = isMaster
    }


    try {
        withCredentials([
            string(credentialsId: 'ma-jenkins-token', variable: 'GH_TOKEN')
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
