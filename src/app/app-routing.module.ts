import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'triple-words/new', loadChildren: './pages/triple-words/triple-words/triple-words.module#TripleWordsPageModule' },
  { path: 'triple-words-detail/:id', loadChildren: './pages/triple-words/triple-words-detail/triple-words-detail.module#TripleWordsDetailPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
