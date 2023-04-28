{ pkgs }: {
  deps = [
    pkgs.nodejs-16_x
    pkgs.nodejs-16_x
    pkgs.chromium
    pkgs.glib
    pkgs.python
    pkgs.libuuid
    pkgs.ffmpeg
    pkgs.imagemagick  
    pkgs.wget
    pkgs.yarn

  ];
env ={
   LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [pkgs.libuuid];
  };
}