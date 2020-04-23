
## Start tests using docker
* clone *[this repo](https://github.com/iarl/puppeteer-example.git)*
* `make build`
* `make start`
To stop docker container:
* `make stop`
To clean all:
* `make purge`
To rebuild and restart:
* `make restart`

## Start tests locally
* Latest node needed 10.x or higher
* clone *[this repo](https://github.com/iarl/puppeteer-example.git)*
* `npm install`
* `npm test`
By default tests will launch in headless mode.
To run in headfull mode:
* `HEADLESS=false npm test`

# TO DO
- Improve page object model
- Fix headfull launch in Docker
- Fix incorrect password test
- Check env. parameters for docker