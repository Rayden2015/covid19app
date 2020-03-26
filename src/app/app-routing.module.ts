import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'global', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'about', loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)},
  { path: 'global', loadChildren: () => import('./global/global.module').then( m => m.GlobalPageModule)},
  { path: 'posts', loadChildren: () => import('./posts/posts.module').then( m => m.PostsPageModule)},
  {path: 'post/:id', loadChildren: () => import('./post/post.module').then(m => m.PostPageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
