import React, { useState } from 'react'
// import AvatarEditor from 'react-avatar-editor'
import { Box, Button, Divider, Modal, Typography, Input } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import Avatar from '@mui/material/Avatar'
import Footer from '../../components/layout/footer/FooterController'
import HeaderCustom from '../../components/layout/headercustom/HeaderCustomController'
import classes from './profilesettings.module.scss'
import BannerSettingController from '../../components/user/BannerSetting/BannerSettingController'
import BioEditController from '../../components/user/BioSetting/BioEditController'
import SERVER_URL from '../../config'

// TODO: Remove when is ready
const mock = [
  'https://i.ibb.co/L0cf3y7/Himalayan-chocolate-point.jpg',

  'https://images.unsplash.com/photo-1519861531473-9200262188bf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',

  'https://i.ibb.co/hgbQNpX/9-BBB1-C95-49-E9-4-F86-A0-CB-57-D07-A00098-B.png',

  'https://i.ibb.co/p3QnfGT/dog-puppy-on-garden-royalty-free-image-1586966191.jpg',
]

const ProfileSettingsView = ({
  user,
  updateProfile,
  avatarOpen,
  handleAvatarOpen,
  handleAvatarClose,
  handleProfilePic,
  handleBioUpdate,
  updateBannerUpload,
  selectedBanner,
  setSelectedBanner,
  bioText,
  setBioText,
  logout,
}) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [openBioEdit, setOpenBioEdit] = useState(false)
  const [profileBanner, setProfileBanner] = useState(user.profileBanner)

  return (
    <div>
      <div style={{ flex: 'true' }}>
        <HeaderCustom title="Edit Profile" />
      </div>
      <div className={classes.banner}>
        <img
          className={classes.bannerImg}
          src={
            // eslint-disable-next-line no-nested-ternary
            profileBanner !== undefined
              ? typeof profileBanner === 'string'
                ? profileBanner
                : `${SERVER_URL}/images/${profileBanner.name}`
              : 'https://i.imgur.com/PcEvuMw.png'
          }
          alt="Banner"
        />
        <Button
          className={classes.edit}
          variant="contained"
          endIcon={<EditIcon />}
          onClick={() => {
            setOpenDialog(true)
          }}
          id="ChangeBanner"
        >
          Change Banner Image
        </Button>
        <BannerSettingController
          opened={openDialog}
          defaultBanners={mock}
          upload={setOpenDialog}
          currentBanner={user.profileBanner}
          updateBannerUpload={updateBannerUpload}
          selectedBanner={selectedBanner}
          setSelectedBanner={setSelectedBanner}
          setProfileBanner={setProfileBanner}
          setOpen={setOpenDialog}
        />
      </div>

      <Divider className={classes.divider} variant="middle" />

      <div className={classes.flex}>
        <Avatar
          className={classes.avatar}
          sx={{ width: 80, height: 80 }}
          src={user.profilePic}
        />
        <Button
          variant="outlined"
          endIcon={<EditIcon />}
          onClick={handleAvatarOpen}
        >
          Edit Avatar
        </Button>
      </div>

      <Divider className={classes.divider} variant="middle" />

      <div className={classes.flex}>
        <div className={classes.left}>
          <p style={{ fontWeight: 'bold' }}>Username</p>
        </div>
        <div className={classes.right}>
          <p style={{ color: 'grey' }}>{user.username}</p>
        </div>
      </div>

      <Divider className={classes.divider} variant="middle" />
      <div className={classes.flex}>
        <div className={classes.left}>
          <p style={{ fontWeight: 'bold' }}>Handle</p>
        </div>
        <div className={classes.right}>
          <p style={{ color: 'grey' }}>{user.nickname}</p>
        </div>
      </div>
      <p className={classes.subtext}>Your handle will appear as:</p>
      <p className={classes.subtext} style={{ marginBottom: '14px' }}>
        @{user.nickname}
      </p>

      <Divider className={classes.divider} variant="middle" />

      <div className={classes.flex}>
        <div className={classes.left}>
          <p style={{ fontWeight: 'bold' }}>Bio</p>
        </div>
        <div className={classes.right}>
          <Button
            variant="text"
            onClick={() => {
              setOpenBioEdit(true)
            }}
          >
            Edit
          </Button>
          <BioEditController
            opened={openBioEdit}
            setOpen={setOpenBioEdit}
            setBioText={setBioText}
            handleBioUpdate={handleBioUpdate}
          />
        </div>
      </div>
      <p className={classes.subtext} style={{ marginBottom: '14px' }}>
        {bioText === undefined ? user.bio : bioText}
      </p>

      <Divider className={classes.divider} variant="middle" />

      <div className={classes.save}>
        <Button type="submit" variant="contained" onClick={logout} id="logout">
          Log out
        </Button>
      </div>

      <Footer />
      {avatarOpen ? (
        <Modal open={avatarOpen} onClose={handleAvatarClose}>
          <div>
            <Box className={classes.modal}>
              <Typography id="modal-modal-title" variant="h5" component="h3">
                Edit your Avatar
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Please upload an image.
              </Typography>
              <label htmlFor="contained-button-file">
                <Input
                  className={classes.upload}
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  onChange={(e) => handleProfilePic(e)}
                />
              </label>
              <Button
                variant="contained"
                component="span"
                className={classes.upload}
                onClick={(e) => updateProfile(e)}
              >
                Upload
              </Button>
            </Box>
          </div>
        </Modal>
      ) : null}
    </div>
  )
}

export default ProfileSettingsView
