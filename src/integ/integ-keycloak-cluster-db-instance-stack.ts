import * as ec2 from '@aws-cdk/aws-ec2';
import * as rds from '@aws-cdk/aws-rds';
import * as cdk from '@aws-cdk/core';
import * as keycloak from '../index';

export class IntegKeycloakClusterDbInstanceStack extends cdk.Stack {
  constructor(scope: cdk.Construct) {
    super(scope, 'integ-keycloak-cluster-db-instance');

    new keycloak.KeycloakCluster(this, 'Keycloak', {
      databaseProvider: keycloak.DatabaseProvider.databaseInstance({
        engine: rds.DatabaseInstanceEngine.mysql({
          version: rds.MysqlEngineVersion.VER_5_7,
        }),
        instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      }),
      desiredCount: 3,
    });
  }
}

const app = new cdk.App();
new IntegKeycloakClusterDbInstanceStack(app);