# React Js Boilerplate

### Environment requirement
> Operating System: `Ubuntu v18.04`
>
> NodeJS: `v10.15.3`
>
> Yarn: `v1.22.10`

### Install Dependencies
> Install project dependencies: `yarn install`

### Development (For Developer)
> Run: `yarn start`
>
> Open browser at: `http://localhost:8080`
>
> Please install flug-in ESLINT into your IDE for code convention auto checking

### Development Build
> Run: `yarn build:development`
>
> Copy all content in `./build` for deployment

### Staging Build
> Run: `yarn build:staging`
>
> Copy all content in `./build` for deployment

### Production Build
> Run: `yarn build:production`
>
> Copy all content in `./build` for deployment

### Check Convention
> Javascript: `yarn lint`
>
> CSS: `yarn stylelint`

### Note
If you have problem with hot-reloading file, excute few these command below to fix it:

echo 100000 | sudo tee /proc/sys/fs/inotify/max_user_watches

And then launch my run command using "-- --reset-cache"
