class Background{
    draw(ctx){
        ctx.fillStyle = "papayawhip";
        ctx.fillRect(500, 425, 100, 50);

        ctx.fillStyle = "black";
        ctx.font = 15 + 'pt Arial';
        ctx.fillText(`fold`, 530, 460);

        ctx.fillStyle = "papayawhip";
        ctx.fillRect(650, 425, 100, 50);

        ctx.fillStyle = "black";
        ctx.font = 15 + 'pt Arial';
        ctx.fillText(`raise`, 680, 460);

        ctx.fillStyle = "papayawhip";
        ctx.fillRect(500, 355, 100, 50);

        ctx.fillStyle = "black";
        ctx.font = 15 + 'pt Arial';
        ctx.fillText(`bet`, 530, 385);

        ctx.fillStyle = "papayawhip";
        ctx.fillRect(650, 355, 100, 50);

        ctx.fillStyle = "black";
        ctx.font = 15 + 'pt Arial';
        ctx.fillText(`check`, 680, 385);

        ctx.fillStyle = "papayawhip";
        ctx.fillRect(570, 285, 100, 50);

        ctx.fillStyle = "black";
        ctx.font = 15 + "pt Arial";
        ctx.fillText(`call`, 605, 315);

    }
}

export default Background