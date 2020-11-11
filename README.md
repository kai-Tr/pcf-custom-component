# pcf-custom-component

Follow the steps below to import and try the sample components in your model-driven or canvas app:

1. Navigate to the folder on your computer where you have downloaded the sample components, and extract the .zip file.  
1. Run the following command to get all the required dependencies:
    ```
    npm install
    ```
1. Create a new folder using the command `mkdir <folder name>` inside the sample component folder and navigate into the folder using the command `cd <folder name>`. 
1. Create a new solution project inside the folder using the following command:
    ```
    pac solution init --publisher-name <Name of the publisher> --publisher-prefix <Publisher prefix>
    ```
1. After the new solution project is created, refer to the location where the sample component is located. You can add the reference using the following command:
    ```
    pac solution add-reference --path <Path to the root of the sample component>
    ```
1. To generate a zip file from your solution project, you need to `cd` into your solution project directory and build the project using the following command:

    ```
    msbuild /t:restore
    ```
1. Again, run the command `msbuild`.