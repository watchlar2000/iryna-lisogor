<script>
export default {
  name: "AboutView",
};
</script>

<template>
  <div class="about">
    <h1>Hi!</h1>
    <p>
      I'm Ira, an illustrator based in Kyiv, Ukraine, who is passionate about
      character design and storytelling. I enjoy diving headfirst into projects,
      exploring, and creating vibrant artworks which tell stories and spark joy.
      Previously worked in various fields like editorial, advertising, and
      social media.
    </p>
    <p>
      Aside from work, I love having fun with my dog, reading books, and
      exploring new things.
    </p>
    <p>
      If you wanna collaborate, have any questions, or just wanna say hi, hit me
      up at
      <a href="mailto:iryna.lisogor.artwrk@gmail.com"
        >iryna.lisogor.artwrk@gmail.com</a
      >.
    </p>
    <p>Resume available upon request.</p>
  </div>
</template>

<style lang="scss" scoped>
.about {
  max-width: 750px;
  margin-inline: auto;

  h1 {
    font-weight: 600;
    color: var(--color-primary);
  }

  p {
    font-size: 24px;
    margin-top: 14px;
    font-weight: 300;
  }

  a {
    font-weight: 500;
  }
}
</style>
