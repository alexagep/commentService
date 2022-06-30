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
                                            'data-target="#controllers-links-module-AppModule-4e1c6829410cf09eeb54f40dfbc0ca555ebab53fd8b3ca86f457c74ba714bf7e11852f388c457ee426c0768a90cc12e8973eb89fded541ed2585c92827457f52"' : 'data-target="#xs-controllers-links-module-AppModule-4e1c6829410cf09eeb54f40dfbc0ca555ebab53fd8b3ca86f457c74ba714bf7e11852f388c457ee426c0768a90cc12e8973eb89fded541ed2585c92827457f52"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-4e1c6829410cf09eeb54f40dfbc0ca555ebab53fd8b3ca86f457c74ba714bf7e11852f388c457ee426c0768a90cc12e8973eb89fded541ed2585c92827457f52"' :
                                            'id="xs-controllers-links-module-AppModule-4e1c6829410cf09eeb54f40dfbc0ca555ebab53fd8b3ca86f457c74ba714bf7e11852f388c457ee426c0768a90cc12e8973eb89fded541ed2585c92827457f52"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-4e1c6829410cf09eeb54f40dfbc0ca555ebab53fd8b3ca86f457c74ba714bf7e11852f388c457ee426c0768a90cc12e8973eb89fded541ed2585c92827457f52"' : 'data-target="#xs-injectables-links-module-AppModule-4e1c6829410cf09eeb54f40dfbc0ca555ebab53fd8b3ca86f457c74ba714bf7e11852f388c457ee426c0768a90cc12e8973eb89fded541ed2585c92827457f52"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-4e1c6829410cf09eeb54f40dfbc0ca555ebab53fd8b3ca86f457c74ba714bf7e11852f388c457ee426c0768a90cc12e8973eb89fded541ed2585c92827457f52"' :
                                        'id="xs-injectables-links-module-AppModule-4e1c6829410cf09eeb54f40dfbc0ca555ebab53fd8b3ca86f457c74ba714bf7e11852f388c457ee426c0768a90cc12e8973eb89fded541ed2585c92827457f52"' }>
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
                                            'data-target="#controllers-links-module-AuthModule-d17dc3f8337900067e2db3bd0d783a100d8fe179412c052ca2fb976e870f284c51542ac586e6add8b82cf26e4f26a0279cc05ce16839385dcd8413f80afeefca"' : 'data-target="#xs-controllers-links-module-AuthModule-d17dc3f8337900067e2db3bd0d783a100d8fe179412c052ca2fb976e870f284c51542ac586e6add8b82cf26e4f26a0279cc05ce16839385dcd8413f80afeefca"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-d17dc3f8337900067e2db3bd0d783a100d8fe179412c052ca2fb976e870f284c51542ac586e6add8b82cf26e4f26a0279cc05ce16839385dcd8413f80afeefca"' :
                                            'id="xs-controllers-links-module-AuthModule-d17dc3f8337900067e2db3bd0d783a100d8fe179412c052ca2fb976e870f284c51542ac586e6add8b82cf26e4f26a0279cc05ce16839385dcd8413f80afeefca"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-d17dc3f8337900067e2db3bd0d783a100d8fe179412c052ca2fb976e870f284c51542ac586e6add8b82cf26e4f26a0279cc05ce16839385dcd8413f80afeefca"' : 'data-target="#xs-injectables-links-module-AuthModule-d17dc3f8337900067e2db3bd0d783a100d8fe179412c052ca2fb976e870f284c51542ac586e6add8b82cf26e4f26a0279cc05ce16839385dcd8413f80afeefca"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-d17dc3f8337900067e2db3bd0d783a100d8fe179412c052ca2fb976e870f284c51542ac586e6add8b82cf26e4f26a0279cc05ce16839385dcd8413f80afeefca"' :
                                        'id="xs-injectables-links-module-AuthModule-d17dc3f8337900067e2db3bd0d783a100d8fe179412c052ca2fb976e870f284c51542ac586e6add8b82cf26e4f26a0279cc05ce16839385dcd8413f80afeefca"' }>
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
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-e00ad83244d75facf030d7d4c852aa20356c79ca63522f52a49f8a19c635c27e8d15570ae23c7e556d83bbaeaa924188fed713a00f11ea526ffbe1de6375760b"' : 'data-target="#xs-controllers-links-module-UsersModule-e00ad83244d75facf030d7d4c852aa20356c79ca63522f52a49f8a19c635c27e8d15570ae23c7e556d83bbaeaa924188fed713a00f11ea526ffbe1de6375760b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-e00ad83244d75facf030d7d4c852aa20356c79ca63522f52a49f8a19c635c27e8d15570ae23c7e556d83bbaeaa924188fed713a00f11ea526ffbe1de6375760b"' :
                                            'id="xs-controllers-links-module-UsersModule-e00ad83244d75facf030d7d4c852aa20356c79ca63522f52a49f8a19c635c27e8d15570ae23c7e556d83bbaeaa924188fed713a00f11ea526ffbe1de6375760b"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-e00ad83244d75facf030d7d4c852aa20356c79ca63522f52a49f8a19c635c27e8d15570ae23c7e556d83bbaeaa924188fed713a00f11ea526ffbe1de6375760b"' : 'data-target="#xs-injectables-links-module-UsersModule-e00ad83244d75facf030d7d4c852aa20356c79ca63522f52a49f8a19c635c27e8d15570ae23c7e556d83bbaeaa924188fed713a00f11ea526ffbe1de6375760b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-e00ad83244d75facf030d7d4c852aa20356c79ca63522f52a49f8a19c635c27e8d15570ae23c7e556d83bbaeaa924188fed713a00f11ea526ffbe1de6375760b"' :
                                        'id="xs-injectables-links-module-UsersModule-e00ad83244d75facf030d7d4c852aa20356c79ca63522f52a49f8a19c635c27e8d15570ae23c7e556d83bbaeaa924188fed713a00f11ea526ffbe1de6375760b"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
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
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
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
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
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
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePassDto.html" data-type="entity-link" >UpdatePassDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
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
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
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
                                <a href="interfaces/ReqResponse-1.html" data-type="entity-link" >ReqResponse</a>
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