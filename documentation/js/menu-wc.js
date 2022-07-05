'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest_mongo_jwt documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-7c0555e5824dfaec229f752c125827cef915eac6c8bccca2a314a0a48128d04cf391fb4adec8238841f9a657981c082dc9ab2fdfe1ed9c140cbb8ad1eca66c36"' : 'data-target="#xs-controllers-links-module-AppModule-7c0555e5824dfaec229f752c125827cef915eac6c8bccca2a314a0a48128d04cf391fb4adec8238841f9a657981c082dc9ab2fdfe1ed9c140cbb8ad1eca66c36"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-7c0555e5824dfaec229f752c125827cef915eac6c8bccca2a314a0a48128d04cf391fb4adec8238841f9a657981c082dc9ab2fdfe1ed9c140cbb8ad1eca66c36"' :
                                            'id="xs-controllers-links-module-AppModule-7c0555e5824dfaec229f752c125827cef915eac6c8bccca2a314a0a48128d04cf391fb4adec8238841f9a657981c082dc9ab2fdfe1ed9c140cbb8ad1eca66c36"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-7c0555e5824dfaec229f752c125827cef915eac6c8bccca2a314a0a48128d04cf391fb4adec8238841f9a657981c082dc9ab2fdfe1ed9c140cbb8ad1eca66c36"' : 'data-target="#xs-injectables-links-module-AppModule-7c0555e5824dfaec229f752c125827cef915eac6c8bccca2a314a0a48128d04cf391fb4adec8238841f9a657981c082dc9ab2fdfe1ed9c140cbb8ad1eca66c36"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-7c0555e5824dfaec229f752c125827cef915eac6c8bccca2a314a0a48128d04cf391fb4adec8238841f9a657981c082dc9ab2fdfe1ed9c140cbb8ad1eca66c36"' :
                                        'id="xs-injectables-links-module-AppModule-7c0555e5824dfaec229f752c125827cef915eac6c8bccca2a314a0a48128d04cf391fb4adec8238841f9a657981c082dc9ab2fdfe1ed9c140cbb8ad1eca66c36"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-f331edb7249bae5529fa0006f0279bae7d076c2f6225985d836a911ecbc64acef90c4bd87674423eeb73f4587018d854a29fcc91aa3efdb80daf044e8fcb9133"' : 'data-target="#xs-controllers-links-module-AuthModule-f331edb7249bae5529fa0006f0279bae7d076c2f6225985d836a911ecbc64acef90c4bd87674423eeb73f4587018d854a29fcc91aa3efdb80daf044e8fcb9133"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-f331edb7249bae5529fa0006f0279bae7d076c2f6225985d836a911ecbc64acef90c4bd87674423eeb73f4587018d854a29fcc91aa3efdb80daf044e8fcb9133"' :
                                            'id="xs-controllers-links-module-AuthModule-f331edb7249bae5529fa0006f0279bae7d076c2f6225985d836a911ecbc64acef90c4bd87674423eeb73f4587018d854a29fcc91aa3efdb80daf044e8fcb9133"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-f331edb7249bae5529fa0006f0279bae7d076c2f6225985d836a911ecbc64acef90c4bd87674423eeb73f4587018d854a29fcc91aa3efdb80daf044e8fcb9133"' : 'data-target="#xs-injectables-links-module-AuthModule-f331edb7249bae5529fa0006f0279bae7d076c2f6225985d836a911ecbc64acef90c4bd87674423eeb73f4587018d854a29fcc91aa3efdb80daf044e8fcb9133"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-f331edb7249bae5529fa0006f0279bae7d076c2f6225985d836a911ecbc64acef90c4bd87674423eeb73f4587018d854a29fcc91aa3efdb80daf044e8fcb9133"' :
                                        'id="xs-injectables-links-module-AuthModule-f331edb7249bae5529fa0006f0279bae7d076c2f6225985d836a911ecbc64acef90c4bd87674423eeb73f4587018d854a29fcc91aa3efdb80daf044e8fcb9133"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommentsModule.html" data-type="entity-link" >CommentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CommentsModule-0949ffedcedd7d68fb3ae2e4018cc7cc4fc3fa3fb92aef748c3975b5cd2a15f0bdb9bb12cc6fc5a2913f77ad49ff464771f506ca3172244a6da4d5ae75e69dee"' : 'data-target="#xs-controllers-links-module-CommentsModule-0949ffedcedd7d68fb3ae2e4018cc7cc4fc3fa3fb92aef748c3975b5cd2a15f0bdb9bb12cc6fc5a2913f77ad49ff464771f506ca3172244a6da4d5ae75e69dee"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CommentsModule-0949ffedcedd7d68fb3ae2e4018cc7cc4fc3fa3fb92aef748c3975b5cd2a15f0bdb9bb12cc6fc5a2913f77ad49ff464771f506ca3172244a6da4d5ae75e69dee"' :
                                            'id="xs-controllers-links-module-CommentsModule-0949ffedcedd7d68fb3ae2e4018cc7cc4fc3fa3fb92aef748c3975b5cd2a15f0bdb9bb12cc6fc5a2913f77ad49ff464771f506ca3172244a6da4d5ae75e69dee"' }>
                                            <li class="link">
                                                <a href="controllers/CommentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CommentsModule-0949ffedcedd7d68fb3ae2e4018cc7cc4fc3fa3fb92aef748c3975b5cd2a15f0bdb9bb12cc6fc5a2913f77ad49ff464771f506ca3172244a6da4d5ae75e69dee"' : 'data-target="#xs-injectables-links-module-CommentsModule-0949ffedcedd7d68fb3ae2e4018cc7cc4fc3fa3fb92aef748c3975b5cd2a15f0bdb9bb12cc6fc5a2913f77ad49ff464771f506ca3172244a6da4d5ae75e69dee"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommentsModule-0949ffedcedd7d68fb3ae2e4018cc7cc4fc3fa3fb92aef748c3975b5cd2a15f0bdb9bb12cc6fc5a2913f77ad49ff464771f506ca3172244a6da4d5ae75e69dee"' :
                                        'id="xs-injectables-links-module-CommentsModule-0949ffedcedd7d68fb3ae2e4018cc7cc4fc3fa3fb92aef748c3975b5cd2a15f0bdb9bb12cc6fc5a2913f77ad49ff464771f506ca3172244a6da4d5ae75e69dee"' }>
                                        <li class="link">
                                            <a href="injectables/CommentsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LikesModule.html" data-type="entity-link" >LikesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-LikesModule-6e054b58634f8fd044d0bad21bdb29e5a414a90faea6acccab691c9790f284285af10ff1372de045ecc39106a22530e1f2f6883177d8389491182e56bf470e01"' : 'data-target="#xs-controllers-links-module-LikesModule-6e054b58634f8fd044d0bad21bdb29e5a414a90faea6acccab691c9790f284285af10ff1372de045ecc39106a22530e1f2f6883177d8389491182e56bf470e01"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LikesModule-6e054b58634f8fd044d0bad21bdb29e5a414a90faea6acccab691c9790f284285af10ff1372de045ecc39106a22530e1f2f6883177d8389491182e56bf470e01"' :
                                            'id="xs-controllers-links-module-LikesModule-6e054b58634f8fd044d0bad21bdb29e5a414a90faea6acccab691c9790f284285af10ff1372de045ecc39106a22530e1f2f6883177d8389491182e56bf470e01"' }>
                                            <li class="link">
                                                <a href="controllers/LikesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LikesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LikesModule-6e054b58634f8fd044d0bad21bdb29e5a414a90faea6acccab691c9790f284285af10ff1372de045ecc39106a22530e1f2f6883177d8389491182e56bf470e01"' : 'data-target="#xs-injectables-links-module-LikesModule-6e054b58634f8fd044d0bad21bdb29e5a414a90faea6acccab691c9790f284285af10ff1372de045ecc39106a22530e1f2f6883177d8389491182e56bf470e01"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LikesModule-6e054b58634f8fd044d0bad21bdb29e5a414a90faea6acccab691c9790f284285af10ff1372de045ecc39106a22530e1f2f6883177d8389491182e56bf470e01"' :
                                        'id="xs-injectables-links-module-LikesModule-6e054b58634f8fd044d0bad21bdb29e5a414a90faea6acccab691c9790f284285af10ff1372de045ecc39106a22530e1f2f6883177d8389491182e56bf470e01"' }>
                                        <li class="link">
                                            <a href="injectables/LikesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LikesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostModule.html" data-type="entity-link" >PostModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PostModule-bdf575f7a0b22663cd8b9562a9dad262f171eaa3cf15b4b844ddc7037b1d6345b0c398b0a6e2e35425a7f0858678ec0f2577d861855eca3009540b6e353d28c2"' : 'data-target="#xs-controllers-links-module-PostModule-bdf575f7a0b22663cd8b9562a9dad262f171eaa3cf15b4b844ddc7037b1d6345b0c398b0a6e2e35425a7f0858678ec0f2577d861855eca3009540b6e353d28c2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostModule-bdf575f7a0b22663cd8b9562a9dad262f171eaa3cf15b4b844ddc7037b1d6345b0c398b0a6e2e35425a7f0858678ec0f2577d861855eca3009540b6e353d28c2"' :
                                            'id="xs-controllers-links-module-PostModule-bdf575f7a0b22663cd8b9562a9dad262f171eaa3cf15b4b844ddc7037b1d6345b0c398b0a6e2e35425a7f0858678ec0f2577d861855eca3009540b6e353d28c2"' }>
                                            <li class="link">
                                                <a href="controllers/PostController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PostModule-bdf575f7a0b22663cd8b9562a9dad262f171eaa3cf15b4b844ddc7037b1d6345b0c398b0a6e2e35425a7f0858678ec0f2577d861855eca3009540b6e353d28c2"' : 'data-target="#xs-injectables-links-module-PostModule-bdf575f7a0b22663cd8b9562a9dad262f171eaa3cf15b4b844ddc7037b1d6345b0c398b0a6e2e35425a7f0858678ec0f2577d861855eca3009540b6e353d28c2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostModule-bdf575f7a0b22663cd8b9562a9dad262f171eaa3cf15b4b844ddc7037b1d6345b0c398b0a6e2e35425a7f0858678ec0f2577d861855eca3009540b6e353d28c2"' :
                                        'id="xs-injectables-links-module-PostModule-bdf575f7a0b22663cd8b9562a9dad262f171eaa3cf15b4b844ddc7037b1d6345b0c398b0a6e2e35425a7f0858678ec0f2577d861855eca3009540b6e353d28c2"' }>
                                        <li class="link">
                                            <a href="injectables/PostService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CommentsController.html" data-type="entity-link" >CommentsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LikesController.html" data-type="entity-link" >LikesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostController.html" data-type="entity-link" >PostController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Comments.html" data-type="entity-link" >Comments</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Likes.html" data-type="entity-link" >Likes</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Posts.html" data-type="entity-link" >Posts</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AuthLoginDto.html" data-type="entity-link" >AuthLoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentDto.html" data-type="entity-link" >CreateCommentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLikeDto.html" data-type="entity-link" >CreateLikeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PagingDto.html" data-type="entity-link" >PagingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePostDto.html" data-type="entity-link" >UpdatePostDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuditMiddleware.html" data-type="entity-link" >AuditMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BenchmarkInterceptor.html" data-type="entity-link" >BenchmarkInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommentsService.html" data-type="entity-link" >CommentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateCommentMiddleware.html" data-type="entity-link" >CreateCommentMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreatePostMiddleware.html" data-type="entity-link" >CreatePostMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LikesService.html" data-type="entity-link" >LikesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostService.html" data-type="entity-link" >PostService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidUserMiddleware.html" data-type="entity-link" >ValidUserMiddleware</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ReqResponse.html" data-type="entity-link" >ReqResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/resComment.html" data-type="entity-link" >resComment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/resFindComment.html" data-type="entity-link" >resFindComment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/resPost.html" data-type="entity-link" >resPost</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});