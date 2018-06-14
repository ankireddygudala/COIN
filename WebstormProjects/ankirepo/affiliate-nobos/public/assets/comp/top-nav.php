<header class="m-grid__item	m-grid m-grid--desktop m-grid--hor-desktop  m-header " >
      <div class="m-grid__item m-grid__item--fluid m-grid m-grid--desktop m-grid--hor-desktop m-container m-container--responsive m-container--xxl">
         <div class="m-grid__item m-grid__item--fluid m-grid m-grid--desktop m-grid--ver-desktop m-header__wrapper">
            <!-- begin::Brand -->
            <div class="m-grid__item m-brand">
               <div class="m-stack m-stack--ver m-stack--general m-stack--inline">
                  <div class="m-stack__item m-stack__item--middle m-brand__logo">
                     <a href="#" class="m-brand__logo-wrapper">
                     <img alt="" src="assets/demo/demo4/media/img/logo/logo.png"/>
                     </a>
                  </div>
                  <div class="m-stack__item m-stack__item--middle m-brand__tools">

                     <div class="m-dropdown m-dropdown--inline  m-dropdown--align-left m-dropdown--align-push" data-dropdown-toggle="click" aria-expanded="true">
                        <a href="#" class="dropdown-toggle m-dropdown__toggle btn btn-outline-metal m-btn  m-btn--icon m-btn--pill">
                        <span style="color:#FFF;">Balance:</span> <?php balance($owner);?>
                        </a>
                        
                     </div>

                     <!-- BEGIN: Responsive Aside Left Menu Toggler -->
                     <a href="javascript:;" id="m_aside_left_offcanvas_toggle" class="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-tablet-and-mobile-inline-block">
                     <span></span>
                     </a>
                     <!-- END -->
                     <!-- begin::Responsive Header Menu Toggler-->
                     <a id="m_aside_header_menu_mobile_toggle" href="javascript:;" class="m-brand__icon m-brand__toggler m--visible-tablet-and-mobile-inline-block">
                     <span></span>
                     </a>
                     <!-- end::Responsive Header Menu Toggler-->
                     <!-- begin::Topbar Toggler-->
                     <!-- <a id="m_aside_header_topbar_mobile_toggle" href="javascript:;" class="m-brand__icon m--visible-tablet-and-mobile-inline-block">
                     <i class="flaticon-more"></i> 
                     </a>-->
                     <!--end::Topbar Toggler-->
                  </div>
                  <div class="m-stack__item m-stack__item--middle m-brand__tools m-dropdown--align-push ">
                     <div class="m-dropdown m-dropdown--inline m-dropdown--arrow control-group1 ">
                       <div class="controls1">
                          <form method="post" action="lang/change-lang.php">
                              <div class="lang-select">
                             <select onchange="this.form.submit()" name="selected_lang" class="selectpicker">
                                <option value="en" <?php if($language=='en'){echo 'selected="selected"';}?> data-content="<img src='assets/img/us-flag.png' class='flag-img'> English">English</option>
                                <option value="fr" <?php if($language=='fr'){echo 'selected="selected"';}?>>French</option>
                                <option value="de" <?php if($language=='de'){echo 'selected="selected"';}?>>German</option>
                                <option value="es" <?php if($language=='es'){echo 'selected="selected"';}?>>Spanish</option>
                              </select>
                              </div>
                          </form>
                        </div>
                     </div>
                  </div>

                  <div class="m-stack__item m-stack__item--middle m-brand__tools m-dropdown--align-push ">
                     <div class="m-dropdown m-dropdown--inline m-dropdown--arrow control-group1 ">
                       <div class="controls1">
                          <form method="post" action="lang/change-currency.php" style="margin-left:5px;">
                              <div class="lang-select">
                              <input type="hidden" name="redirect" value="<?php echo pathinfo($_SERVER['PHP_SELF'], PATHINFO_FILENAME);?>">
                             <select onchange="this.form.submit()" name="selected_currency" class="selectpicker" data-width="90px">
                                <option value="en-US" <?php if($_SESSION['locale']=='en-US'){echo 'selected="selected"';}?>>USD</option>
                                 <option value="en-GB" <?php if($_SESSION['locale']=='en-GB'){echo 'selected="selected"';}?>>GBP</option>
                                <option value="en-IN" <?php if($_SESSION['locale']=='en-IN'){echo 'selected="selected"';}?>>INR</option>
                                <option value="de-DE" <?php if($_SESSION['locale']=='de-DE'){echo 'selected="selected"';}?>>EUR</option>
                                <option value="ja_JP" <?php if($_SESSION['locale']=='ja_JP'){echo 'selected="selected"';}?>>JPY</option>
                                 <option value="ru_RU" <?php if($_SESSION['locale']=='ru_RU'){echo 'selected="selected"';}?>>RUR</option>
                              </select>
                              </div>
                          </form>
                        </div>
                     </div>
                  </div>
                  
               </div>
            </div>
            <!-- end::Brand -->                                        					<!-- begin::Topbar -->
            <div class="m-grid__item m-grid__item--fluid m-header-head" id="m_header_nav">
               <div id="m_header_topbar" class="m-topbar  m-stack m-stack--ver m-stack--general">
                  <div class="m-stack__item m-topbar__nav-wrapper">
                     <ul class="m-topbar__nav m-nav m-nav--inline">
                        
                        <li class="m-nav__item m-topbar__user-profile m-topbar__user-profile--img  m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light" data-dropdown-toggle="click">
                           <a href="#" class="m-nav__link m-dropdown__toggle">
                           <span class="m-topbar__userpic">
                           <img src="assets/app/media/img/users/user4.jpg" class="m--img-rounded m--marginless m--img-centered" alt=""/>
                           </span>
                           </a>
                           <div class="m-dropdown__wrapper">
                              <span class="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust"></span>
                              <div class="m-dropdown__inner">

                                 <div class="m-dropdown__header m--align-center" style="background: url(assets/app/media/img/misc/user_profile_bg.jpg); background-size: cover;">
                                    <div class="m-card-user m-card-user--skin-dark">
                                       <div class="m-card-user__pic">
                                          <img src="assets/app/media/img/users/user4.jpg" class="m--img-rounded m--marginless" alt=""/>
                                       </div>
                                       <div class="m-card-user__details">
                                          <span class="m-card-user__name m--font-weight-500">
                                          <?php avatar($userid);?>
                                          <?php echo ucwords($fullname);?>
                                          </span>
                                          <a href="" class="m-card-user__email m--font-weight-300 m-link">
                                          mark.andre@gmail.com
                                          </a>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="m-dropdown__body">
                                    <div class="m-dropdown__content">
                                       <ul class="m-nav m-nav--skin-light">
                                          <li class="m-nav__section m--hide">
                                             <span class="m-nav__section-text">
                                             Section
                                             </span>
                                          </li>
                                          <li class="m-nav__item">
                                             <a href="profile" class="m-nav__link">
                                             <i class="m-nav__link-icon flaticon-profile-1"></i>
                                             <span class="m-nav__link-title">
                                             <span class="m-nav__link-wrap">
                                             <span class="m-nav__link-text">
                                             <?php echo $lang['ACCOUNT_PROFILE'];?>
                                             </span>
                                             </span>
                                             </span>
                                             </a>
                                          </li>
                                          
                                          <li class="m-nav__separator m-nav__separator--fit"></li>
                                          <?php 
                                             $lang_u = $lang['USER_MANAGEMENT'];
                                             $lang_a = $lang['ADMIN_SETTINGS'];
                                             admin_control($admin_user, $lang_u, $lang_a);
                                             ?>
                                          <li class="m-nav__item">
                                             <a href="<?php echo $domain_path;?>/access/logout" class="btn m-btn--pill btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder">
                                             <?php echo $lang['LOGOFF'];?>
                                             </a>
                                          </li>
                                       </ul>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </li>
                        <li id="m_quick_sidebar_toggle" class="m-nav__item">
                           <a href="#" class="m-nav__link m-dropdown__toggle">
                           <span class="m-nav__link-icon m-nav__link-icon--aside-toggle">
                           <span class="m-nav__link-icon-wrapper">
                           <i class="flaticon-menu-button"></i>
                           </span>
                           </span>
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <!-- end::Topbar -->
         </div>
      </div>
   </header>