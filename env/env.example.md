# Environment Files

Four Environment files are required:

| File            	| Description                                           	|
|-----------------	|-------------------------------------------------------	|
| .env            	| Contains build data/help scripts (never used in app)  	|
| .env.dev        	| Contains .env for Dev stage                           	|
| .env.staging    	| Contains .env for Staging stage                       	|
| .env.production 	| Contains .env for Production stage                    	|

Required Variables
----

* `API_DEV=(local|awsdev|aws)`
* `NODE_PATH="./app"`
* `APP_ENV=(dev|staging)`



